/**
  judging.policy.js
  Ownership and access logic for judging.
 */

class JudgingPolicy {
  isScoreOwner(score, judgeId) {
    if (!score || !score.judgeId) return false;
    return score.judgeId.toString() === judgeId.toString();
  }

  isAssignedJudge(assignment) {
    // If an assignment record exists, the judge is assigned.
    // The model does not have a boolean 'assigned' field; existence of the record is the check.
    return !!assignment;
  }
}

const judgingPolicy = new JudgingPolicy();
export default judgingPolicy;
