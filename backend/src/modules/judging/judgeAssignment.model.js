import mongoose from "mongoose";

const judgeAssignmentSchema = new mongoose.Schema(
  {
    judgeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    hackathonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignedAt: {
      type: Date,
      default: Date.now
    },
    assigned: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// One judge can be assigned to a hackathon only once
judgeAssignmentSchema.index({ judgeId: 1, hackathonId: 1 }, { unique: true });

const JudgeAssignment =
  mongoose.models.JudgeAssignment ||
  mongoose.model("JudgeAssignment", judgeAssignmentSchema);

export default JudgeAssignment;
