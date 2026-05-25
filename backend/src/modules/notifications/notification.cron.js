/**
 * notification.cron.js
 * Asynchronous background worker scheduled via node-cron to process enqueued emails.
 */
import Notification from './notification.model.js';
import { sendEmail } from './notification.mailer.js';

/**
 * Checks for enqueued notification emails, transmits them via Brevo API,
 * and updates their database delivery logs. Capped to prevent SMTP congestion.
 */
export const processPendingEmails = async () => {
  console.log('[Notification Cron] Scanning for pending email notifications...');
  
  try {
    // Queries up to 10 pending notification emails that have failed fewer than 3 times
    const pendingNotifications = await Notification.find({
      emailStatus: 'pending',
      emailAttempts: { $lt: 3 }
    }).limit(10);

    if (pendingNotifications.length === 0) {
      return;
    }

    console.log(`[Notification Cron] Found ${pendingNotifications.length} pending emails to process`);

    for (const notification of pendingNotifications) {
      const { emailData } = notification;

      if (!emailData || !emailData.to || !emailData.type) {
        notification.emailStatus = 'failed';
        notification.emailError = 'Invalid email payload: missing recipient to address or template type';
        await notification.save();
        continue;
      }

      // Increment attempt counter prior to calling Brevo REST endpoint
      notification.emailAttempts += 1;

      try {
        await sendEmail(emailData.to, emailData.type, emailData.payload);
        
        notification.emailStatus = 'sent';
        notification.emailError = null;
        console.log(`[Notification Cron] Successfully sent email "${emailData.type}" to ${emailData.to}`);
      } catch (err) {
        console.error(`[Notification Cron Failure] Attempt ${notification.emailAttempts} failed for notification ${notification._id}:`, err.message);
        
        // Retry later if attempts < 3, otherwise transition status to failed
        notification.emailStatus = notification.emailAttempts >= 3 ? 'failed' : 'pending';
        notification.emailError = err.message;
      }

      await notification.save();
    }
    
    console.log('[Notification Cron] Email batch processing completed');
  } catch (error) {
    console.error('[Notification Cron Critical Error] Failed to execute email cron job:', error.message);
  }
};
