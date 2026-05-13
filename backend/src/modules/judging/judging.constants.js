/**
  judging.constants.js
  Shared constants for the judging module.
 */

export const scoreStatus = {
  PENDING: "Pending",
  SUBMITTED: "Submitted",
  UPDATED: "Updated"
};

export const scoreStatusEnums = Object.values(scoreStatus);

export const MAX_SCORE_PER_CRITERION = 10;
export const MIN_SCORE_PER_CRITERION = 0;
