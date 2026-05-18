/**
  hackathon.service.js
  Contains the core business rules for hackathon.
 */
import Hackathon from '../admin/hackathons/hackathon.model.js';

// Statuses where the problem statement must be hidden from non-admin callers
const HIDE_PROBLEM_STATEMENT_FOR = ['upcoming'];

/**
 * Remove problemStatement from the plain object when the hackathon status
 * is one that should keep it private (e.g. "upcoming").
 *
 * Accepts a plain JS object (already lean / toObject-ed) and returns it
 * (mutated in place for efficiency, the caller owns the reference).
 */
function sanitizeHackathon(hackathon) {
  // Handle null / undefined / non-object gracefully
  if (!hackathon || typeof hackathon !== 'object') return hackathon;

  if (HIDE_PROBLEM_STATEMENT_FOR.includes(hackathon.status)) {
    delete hackathon.problemStatement;
  }
  return hackathon;
}

class Hackathonservice {
  // Get all hackathons
  async getAllHackathons() {
    const hackathons = await Hackathon.find().lean();
    return hackathons.map(hackathon => sanitizeHackathon(hackathon));
  }

  // Get hackathon by ID
  async getHackathonById(hackathonId) {
    const hackathon = await Hackathon.findById(hackathonId).lean();
    return sanitizeHackathon(hackathon);
  }
};

const hackathonService = new Hackathonservice();
export default hackathonService;