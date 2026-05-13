/**
  judging.service.js
  Business logic for judge assignment and scoring.
 */

import judgingRepository from "./judging.repository.js";
import judgingPolicy from "./judging.policy.js";
import Hackathon from "../admin/hackathons/hackathon.model.js";
import User from "../users/user.model.js";
import Submission from "../submissions/submission.model.js";
import ApiError from "../../libs/apiError.js";

class JudgingService {
  async assignJudges(hackathonId, judgeIds, adminId) {
    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      throw new ApiError(404, "Hackathon not found");
    }

    const judges = await User.find({ _id: { $in: judgeIds }, role: "Judge" });
    if (judges.length !== judgeIds.length) {
      throw new ApiError(400, "One or more invalid judge IDs, or user is not a Judge");
    }

    const assignments = judgeIds.map((id) => ({
      judgeId: id,
      hackathonId,
      assignedBy: adminId
    }));

    try {
      const result = await judgingRepository.createManyAssignments(assignments);
      return {
        assigned: result.length,
        hackathonId
      };
    } catch (error) {
      if (error.code === 11000) {
        // Some or all were duplicates. insertMany with ordered:false still throws an error but inserts the valid ones.
        // Mongoose 11000 with ordered:false often has insertedDocs in error.result
        return {
          assigned: error.insertedDocs ? error.insertedDocs.length : 0,
          hackathonId,
          message: "Some judges were already assigned"
        };
      }
      throw error;
    }
  }

  async getJudgeAssignments(judgeId) {
    return await judgingRepository.findAssignmentsByJudge(judgeId);
  }

  async getSubmissionsForJudge(hackathonId, judgeId) {
    const assignment = await judgingRepository.findAssignment(judgeId, hackathonId);
    if (!judgingPolicy.isAssignedJudge(assignment)) {
      throw new ApiError(403, "You are not assigned to this hackathon");
    }

    const submissions = await Submission.find({ hackathonId })
      .populate("userId", "fullName email")
      .populate("teamId", "teamName");

    // Check which ones are already scored by this judge
    const scoredSubmissions = [];
    for (const sub of submissions) {
      const score = await judgingRepository.findScoreByJudgeAndSubmission(judgeId, sub._id);
      scoredSubmissions.push({
        ...sub.toObject(),
        scored: !!score,
        scoreId: score ? score._id : null
      });
    }

    return scoredSubmissions;
  }

  async submitScore(submissionId, judgeId, hackathonId, scoreData) {
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      throw new ApiError(404, "Submission not found");
    }

    if (submission.hackathonId.toString() !== hackathonId.toString()) {
      throw new ApiError(400, "Submission does not belong to this hackathon");
    }

    const assignment = await judgingRepository.findAssignment(judgeId, hackathonId);
    if (!judgingPolicy.isAssignedJudge(assignment)) {
      throw new ApiError(403, "You are not assigned to this hackathon");
    }

    const existingScore = await judgingRepository.findScoreByJudgeAndSubmission(judgeId, submissionId);
    if (existingScore) {
      throw new ApiError(409, "You have already scored this submission");
    }

    const hackathon = await Hackathon.findById(hackathonId);
    const judgingCriteria = hackathon.judgingCriteria || [];

    // Validate and map scores to criteria weights
    const criterionScores = [];
    for (const criterion of judgingCriteria) {
      const submittedScore = scoreData.criterionScores.find(
        (cs) => cs.criterionName === criterion.name
      );

      if (!submittedScore) {
        throw new ApiError(400, `Missing score for criterion: ${criterion.name}`);
      }

      criterionScores.push({
        criterionName: criterion.name,
        score: submittedScore.score,
        weight: criterion.weight
      });
    }

    const newScore = await judgingRepository.createScore({
      judgeId,
      submissionId,
      hackathonId,
      criterionScores,
      feedback: scoreData.feedback,
      status: "Submitted"
    });

    return newScore;
  }

  async updateScore(scoreId, judgeId, updateData) {
    const score = await judgingRepository.findScoreById(scoreId);
    if (!score) {
      throw new ApiError(404, "Score not found");
    }

    if (!judgingPolicy.isScoreOwner(score, judgeId)) {
      throw new ApiError(403, "You are not authorized to update this score");
    }

    if (updateData.criterionScores) {
      const hackathon = await Hackathon.findById(score.hackathonId);
      const judgingCriteria = hackathon.judgingCriteria || [];

      const newCriterionScores = [];
      for (const criterion of judgingCriteria) {
        // If not provided in update, keep the old one
        const submittedScore = updateData.criterionScores.find(
          (cs) => cs.criterionName === criterion.name
        );

        if (submittedScore) {
          newCriterionScores.push({
            criterionName: criterion.name,
            score: submittedScore.score,
            weight: criterion.weight
          });
        } else {
          // Keep existing
          const existing = score.criterionScores.find((cs) => cs.criterionName === criterion.name);
          if (existing) {
             newCriterionScores.push(existing);
          } else {
             throw new ApiError(400, `Missing score for criterion: ${criterion.name}`);
          }
        }
      }
      score.criterionScores = newCriterionScores;
    }

    if (updateData.feedback !== undefined) {
      score.feedback = updateData.feedback;
    }

    score.status = "Updated";
    
    return await judgingRepository.saveScore(score);
  }
}

const judgingService = new JudgingService();
export default judgingService;
