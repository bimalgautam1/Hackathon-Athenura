import Result from './result.model.js';

class ResultRepository {
  async bulkCreate(resultsData) {
    return Result.insertMany(resultsData);
  }

  async findByHackathonId(hackathonId) {
    return Result.find({ hackathonId }).lean();
  }
  
  async findByUserId(userId) {
    return Result.find({ userId, isPublished: true }).populate('hackathonId', 'title slug').lean();
  }

  /**
   * Find the best (lowest) rank for a user from published results.
   * @param {string} userId - The user ID to search for
   * @returns {Promise<object|null>} - The result with the best rank or null
   */
  async findBestRankByUserId(userId) {
    return Result.findOne({
      userId,
      isPublished: true,
      rank: { $ne: null }
    })
      .sort({ rank: 1 })
      .lean();
  }
  
  async deleteByHackathonId(hackathonId) {
    return Result.deleteMany({ hackathonId });
  }
}

export default new ResultRepository();
