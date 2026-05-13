/**
  asset.service.js
  Handles attaching and detaching assets to/from submissions.
 */

import submissionRepository from "./submission.repository.js";
import submissionPolicy from "./submission.policy.js";
import uploadService from "./upload.service.js";
import ApiError from "../../libs/apiError.js";
import { MAX_ASSETS_PER_SUBMISSION } from "./submission.constants.js";

class AssetService {
  async addAssets(submissionId, userId, req) {
    // 1. Find submission
    const submission = await submissionRepository.findSubmissionById(submissionId);
    if (!submission) {
      throw new ApiError(404, "Submission not found");
    }

    // 2. Check ownership
    if (!submissionPolicy.isOwner(submission, userId)) {
      throw new ApiError(403, "You are not authorized to add assets to this submission");
    }

    // 3. Upload assets
    const newAssets = await uploadService.parseAndUpload(req);

    // 4. Enforce max assets limit
    if (submission.assets.length + newAssets.length > MAX_ASSETS_PER_SUBMISSION) {
      throw new ApiError(400, `Cannot exceed maximum of ${MAX_ASSETS_PER_SUBMISSION} assets per submission`);
    }

    // 5. We update version when assets are added as this is a modification to the submission
    // Create snapshot BEFORE mutating
    await submissionRepository.createVersion({
      submissionId: submission._id,
      version: submission.version,
      title: submission.title,
      description: submission.description,
      techStack: submission.techStack,
      repoUrl: submission.repoUrl,
      demoUrl: submission.demoUrl,
      assets: submission.assets
    });

    // 6. Append assets and save
    submission.assets.push(...newAssets);

    submission.version += 1;
    submission.status = "Submitted";
    submission.submittedAt = new Date();

    await submissionRepository.saveSubmission(submission, { validateBeforeSave: true });

    return submission;
  }
}

const assetService = new AssetService();
export default assetService;
