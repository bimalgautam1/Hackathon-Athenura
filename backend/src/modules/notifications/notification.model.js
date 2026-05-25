/**
 * notification.model.js
 * Defines the Mongoose schema and model for notification records stored in MongoDB.
 */
import mongoose from 'mongoose';
import { NOTIFICATION_TYPES } from './notification.constants.js';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recipient User ID is required'],
      index: true
    },
    title: {
      type: String,
      required: [true, 'Notification title is required'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Notification message content is required'],
      trim: true
    },
    type: {
      type: String,
      required: [true, 'Notification type is required'],
      enum: Object.values(NOTIFICATION_TYPES)
    },
    isRead: {
      type: Boolean,
      default: false
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    // Background Email Processing Configuration
    emailStatus: {
      type: String,
      enum: ['none', 'pending', 'sent', 'failed'],
      default: 'none',
      index: true
    },
    emailData: {
      to: { type: String, lowercase: true, trim: true },
      type: { type: String },
      payload: { type: mongoose.Schema.Types.Mixed }
    },
    emailAttempts: {
      type: Number,
      default: 0
    },
    emailError: {
      type: String,
      default: null
    },
    // Centralised time-to-live automatic data retention policy (auto-purged after 90 days)
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from creation
      index: { expires: 0 } // index with expires: 0 deletes the document at the absolute expiresAt date
    }
  },
  {
    timestamps: true
  }
);

// ── Compound Indexes for High-Performance Queries ────────────────
// Optimises retrieving chronological user notification feeds
notificationSchema.index({ recipient: 1, createdAt: -1 });

// Optimises querying read/unread states and computing unread count metrics
notificationSchema.index({ recipient: 1, isRead: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
