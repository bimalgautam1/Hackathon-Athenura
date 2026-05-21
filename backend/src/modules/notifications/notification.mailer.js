/**
  notification.mailer.js
  Builds and sends email notifications tied to notification events, using templates and fallback content.
  This module provides a centralized email sending service using Brevo REST API.
  */

import { brevoClient } from '../../config/mail.js'
import envConfig from '../../config/envConfig.js'
import { EMAIL_TYPES } from '../../utils/constants/notificationTypes.js'

/**
 * Email templates with subject and HTML content generators.
 * Each template function receives data specific to the notification type.
 */
const emailTemplates = {
  [EMAIL_TYPES.VERIFY_EMAIL]: ({ otp, fullName }) => ({
    subject: 'Verify Your Email - Hackathon Platform',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hello ${fullName || 'there'},</h2>
        <p>Thank you for registering! Please verify your email address to complete your registration.</p>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #007bff; margin: 0; font-size: 32px;">${otp}</h1>
          <p style="margin: 10px 0 0 0; color: #666;">Your verification code (valid for 10 minutes)</p>
        </div>
        <p>Enter this code on the verification page to confirm your email.</p>
        <p style="color: #999; font-size: 12px;">If you didn't register, please ignore this email.</p>
      </div>
    `
  }),

  [EMAIL_TYPES.RESEND_OTP]: ({ otp, fullName }) => ({
    subject: 'New Verification Code - Hackathon Platform',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hello ${fullName || 'there'},</h2>
        <p>Here's your new verification code:</p>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #007bff; margin: 0; font-size: 32px;">${otp}</h1>
          <p style="margin: 10px 0 0 0; color: #666;">Your verification code (valid for 10 minutes)</p>
        </div>
        <p>Enter this code to verify your email address.</p>
      </div>
    `
  }),

  [EMAIL_TYPES.RESET_PASSWORD]: ({ otp, fullName }) => ({
    subject: 'Reset Your Password - Hackathon Platform',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hello ${fullName || 'there'},</h2>
        <p>You requested a password reset. Please use the following code to set a new password:</p>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #007bff; margin: 0; font-size: 32px;">${otp}</h1>
          <p style="margin: 10px 0 0 0; color: #666;">Your reset code (valid for 15 minutes)</p>
        </div>
        <p>Enter this code on the reset password page.</p>
        <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      </div>
    `
  }),

  [EMAIL_TYPES.REGISTRATION_CONFIRMATION]: ({ hackathonTitle, startDate, endDate, fullName }) => ({
    subject: `Registration Confirmed - ${hackathonTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hello ${fullName || 'there'},</h2>
        <p>Your registration for <strong>${hackathonTitle}</strong> has been confirmed!</p>
        <div style="background-color: #f4f4f4; padding: 20px; margin: 20px 0; border-left: 4px solid #007bff;">
          <h3 style="margin-top: 0;">Hackathon Details</h3>
          <p><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> ${new Date(endDate).toLocaleDateString()}</p>
        </div>
        <p>Get ready to participate! More details will be shared closer to the event.</p>
      </div>
    `
  }),

  [EMAIL_TYPES.PAYMENT_CONFIRMATION]: ({ amount, currency, hackathonTitle, fullName }) => ({
    subject: `Payment Confirmed - ${hackathonTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hello ${fullName || 'there'},</h2>
        <p>Your payment for <strong>${hackathonTitle}</strong> has been confirmed!</p>
        <div style="background-color: #f4f4f4; padding: 20px; margin: 20px 0; border-left: 4px solid #28a745;">
          <h3 style="margin-top: 0; color: #28a745;">Payment Receipt</h3>
          <p><strong>Amount:</strong> ${currency === 'INR' ? '₹' : '$'}${amount}</p>
          <p><strong>For:</strong> ${hackathonTitle}</p>
        </div>
        <p>Your registration is now complete. We look forward to seeing you at the hackathon!</p>
      </div>
    `
  }),

  [EMAIL_TYPES.PAYMENT_FAILED]: ({ hackathonTitle, fullName }) => ({
    subject: `Payment Failed - ${hackathonTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hello ${fullName || 'there'},</h2>
        <p>We attempted to process your payment for <strong>${hackathonTitle}</strong> but it failed.</p>
        <div style="background-color: #fff3f3; padding: 20px; margin: 20px 0; border-left: 4px solid #dc3545;">
          <p>Please try again with a different payment method.</p>
        </div>
        <p>Your registration is still pending. Complete payment to confirm your spot.</p>
      </div>
    `
  }),

  [EMAIL_TYPES.TEAM_INVITATION]: ({ teamName, hackathonTitle, invitedBy, inviteLink, fullName }) => ({
    subject: `Team Invitation - ${teamName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hello ${fullName || 'there'},</h2>
        <p>You've been invited to join <strong>${teamName}</strong> for <strong>${hackathonTitle}</strong>!</p>
        <p><strong>Invited by:</strong> ${invitedBy}</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${envConfig.clientUrl || 'http://localhost:5173'}${inviteLink}" 
             style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Accept Invitation
          </a>
        </div>
        <p>This invitation will expire in 12 hours. <a href="${envConfig.clientUrl || 'http://localhost:5173'}${inviteLink}">Click here to respond</a>.</p>
      </div>
    `
  }),

  [EMAIL_TYPES.INVITATION_ACCEPTED]: ({ teamName, memberName }) => ({
    subject: `${memberName} Joined Your Team - ${teamName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Good news!</h2>
        <p><strong>${memberName}</strong> has accepted your invitation and joined your team <strong>${teamName}</strong>.</p>
        <p>You can now coordinate with your team members for the upcoming hackathon.</p>
      </div>
    `
  }),

  [EMAIL_TYPES.INVITATION_DECLINED]: ({ teamName, memberName }) => ({
    subject: `Invitation Declined - ${teamName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Invitation Update</h2>
        <p><strong>${memberName}</strong> has declined your invitation to join team <strong>${teamName}</strong>.</p>
        <p>You can invite other members or adjust your team strategy.</p>
      </div>
    `
  }),

  [EMAIL_TYPES.CERTIFICATE_READY]: ({ hackathonTitle, certificateUrl, fullName }) => ({
    subject: `Certificate Ready - ${hackathonTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hello ${fullName || 'there'},</h2>
        <p>Congratulations! Your certificate for <strong>${hackathonTitle}</strong> is ready.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${certificateUrl}" 
             style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Download Certificate
          </a>
        </div>
        <p>Thank you for participating. We hope to see you at future events!</p>
      </div>
    `
  }),

  [EMAIL_TYPES.HACKATHON_DETAILS]: ({ fullName, hackathonTitle, problemStatement, startDate, endDate, submissionDeadline, rules, judgingCriteria, hackathonLink }) => ({

    subject: `Hackathon Details: ${hackathonTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hello ${fullName || 'there'},</h2>
        <p>Great news! The hackathon <strong>${hackathonTitle}</strong> has officially started. We are excited to share all the details with you — good luck!</p>

        <div style="background-color: #f4f4f4; padding: 20px; margin: 20px 0; border-left: 4px solid #007bff;">
          <h3 style="margin-top: 0; color: #007bff;">Theme</h3>
          <p style="font-size: 16px;"><strong>${problemStatement}</strong></p>
        </div>

        <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #28a745;">
          <h3 style="margin-top: 0; color: #28a745;">Schedule</h3>
          <p><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> ${new Date(endDate).toLocaleDateString()}</p>
          <p><strong>Submission Deadline:</strong> ${new Date(submissionDeadline).toLocaleDateString()}</p>
        </div>

        ${rules && rules.length ? `
        <div style="background-color: #fff8e1; padding: 20px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h3 style="margin-top: 0; color: #f39c12;">Rules</h3>
          ${rules.map((rule, i) => `<p style="margin: 4px 0;">${i + 1}. ${rule}</p>`).join('')}
        </div>
        ` : ''}

        ${judgingCriteria && judgingCriteria.length ? `
        <div style="background-color: #eafaf1; padding: 20px; margin: 20px 0; border-left: 4px solid #27ae60;">
          <h3 style="margin-top: 0; color: #27ae60;">Judging Criteria</h3>
          ${judgingCriteria.map(c => `<p style="margin: 4px 0;"><strong>${c.name}</strong> — ${c.weight}%</p>`).join('')}
        </div>
        ` : ''}

        <p style="margin-top: 20px;">We have attached the official hackathon details PDF to this email. Please review it carefully before you begin.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${envConfig.clientUrl || 'http://localhost:5173'}${hackathonLink}"
             style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            View Hackathon Details
          </a>
        </div>
      </div>
    `
  }),

  // Map HACKATHON_STARTED to the same template logic as HACKATHON_DETAILS
  [EMAIL_TYPES.HACKATHON_STARTED]: (data) => emailTemplatesEMAIL_TYPES.HACKATHON_DETAILS
}

/**
 * Sends an email using the Brevo REST API.
 * 
 * @param {string} to - Recipient email address
 * @param {string} type - Email type from EMAIL_TYPES
 * @param {object} data - Data to populate the template
 * @param {Array} [attachment] - Optional array of PDF attachments [{name, content: base64String}]
 * @returns {Promise<object>} Result with success status and messageId
 */
async function sendEmail(to, type, data = {}, attachment = null) {
  // Validate email type — EMAIL_TYPES already contains all registered types.
  const validTypes = Object.values(EMAIL_TYPES);
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid email type: ${type}`);
  }

  // Get template or use a default fallback
  const templateFn = emailTemplates[type]
  if (!templateFn) {
    throw new Error(`No template found for email type: ${type}`)
  }

  const { subject, html } = templateFn(data)

  // Determine sender email from config
  const senderEmail = envConfig.brevoSenderEmail || 'noreply@hackathon-platform.com'
  const senderName = 'Hackathon Platform'

   const emailData = {
    sender: {
      name: senderName,
      email: senderEmail
    },
    to: [{ email: to }],
    subject: subject,
    htmlContent: html
  }

  if (attachment) {
    // Support both a single attachment object and an array of attachments
    const attachments = Array.isArray(attachment) ? attachment : [attachment];
    // Only include objects that have both a name and content property
    emailData.attachment = attachments.filter(a => a && a.name && a.content).map(a => ({
      name: a.name,
      content: a.content,
      // Brevo accepts contentType as well; default to application/pdf
      contentType: a.contentType || 'application/pdf'
    }));
  }

  if (emailData.attachment && emailData.attachment.length === 0) {
    delete emailData.attachment;
  }

  try {
    const response = await brevoClient.post('/smtp/email', emailData)
    console.log(`Email sent successfully to ${to}, messageId: ${response.data.messageId}`)
    return { success: true, messageId: response.data.messageId }
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error.response?.data || error.message)
    throw new Error(`Failed to send email: ${error.response?.data?.message || error.message}`)
  }
}

/**
 * Sends verification OTP email to a user.
 * 
 * @param {string} email - Recipient email
 * @param {string} otp - One-time password
 * @param {string} fullName - User's full name
 */
async function sendVerificationEmail(email, otp, fullName) {
  return sendEmail(email, EMAIL_TYPES.VERIFY_EMAIL, { otp, fullName })
}

/**
 * Sends a password reset email.
 * 
 * @param {string} email - Recipient email
 * @param {string} otp - Reset OTP
 * @param {string} fullName - User's full name
 */
async function sendPasswordResetEmail(email, otp, fullName) {
  return sendEmail(email, EMAIL_TYPES.RESET_PASSWORD, { otp, fullName })
}

export {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  EMAIL_TYPES,
  emailTemplates
}
