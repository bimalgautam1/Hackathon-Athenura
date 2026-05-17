/**
  judging.repository.js
  Handles all database queries for JudgeAssignments and Scores.
 */

import JudgeAssignment from "./judgeAssignment.model.js";
import Score from "./score.model.js";

class JudgingRepository {
  async createAssignment(data) {
    return await JudgeAssignment.create(data);
  }

  async createManyAssignments(dataArray) {
    // ordered: false allows inserting non-duplicates even if some fail due to unique index
    return await JudgeAssignment.insertMany(dataArray, { ordered: false });
  }

  async findAssignmentsByJudge(judgeId) {
    return await JudgeAssignment.find({ judgeId }).populate(
      "hackathonId",
      "title startDate endDate submissionDeadline"
    );
  }

  async findAssignment(judgeId, hackathonId) {
    return await JudgeAssignment.findOne({ judgeId, hackathonId });
  }

  async createScore(data) {
    return await Score.create(data);
  }

  async findScoreById(id) {
    return await Score.findById(id);
  }

  async findScoreByJudgeAndSubmission(judgeId, submissionId) {
    return await Score.findOne({ judgeId, submissionId });
  }

  async findScoresByJudgeAndHackathon(judgeId, hackathonId) {
    return await Score.find({ judgeId, hackathonId });
  }

  async findScoresBySubmission(submissionId) {
    return await Score.find({ submissionId }).populate(
      "judgeId",
      "fullName email"
    );
  }

  async findScoresByHackathon(hackathonId) {
    return await Score.find({ hackathonId });
  }

  async saveScore(score) {
    return await score.save();
  }
}

const judgingRepository = new JudgingRepository();
export default judgingRepository;
