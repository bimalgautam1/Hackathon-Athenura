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
    return !!assignment;
  }
}

const judgingPolicy = new JudgingPolicy();
export default judgingPolicy;
