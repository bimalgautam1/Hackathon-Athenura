/**
  submission.policy.js
  Checks authorization and object-level access rules for submission, such as ownership, role, and state checks.
 */

class SubmissionPolicy {

  /**
   * Check if user owns this submission
   */
  isOwner(submission, userId) {
    return submission.userId.toString() === userId.toString()
  }
}

const submissionPolicy = new SubmissionPolicy()
export default submissionPolicy
