import Joi from "joi";
import ApiError from "../../libs/apiError.js";

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message).join(", ");
    return next(new ApiError(400, "Validation error", errors));
  }
  next();
};

const validateParams = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message).join(", ");
    return next(new ApiError(400, "Validation error", errors));
  }
  next();
};

const objectIdHex24 = Joi.string().hex().length(24);

export const assignJudgesValidation = Joi.object({
  judgeIds: Joi.array().items(objectIdHex24).min(1).required().messages({
    "array.min": "At least one judge must be selected",
    "any.required": "judgeIds is required"
  })
});

const criterionScoreValidation = Joi.object({
  criterionName: Joi.string().required(),
  score: Joi.number().min(0).max(10).required()
});

export const submitScoreValidation = Joi.object({
  criterionScores: Joi.array().items(criterionScoreValidation).min(1).required(),
  feedback: Joi.string().max(2000).optional()
});

export const updateScoreValidation = Joi.object({
  criterionScores: Joi.array().items(criterionScoreValidation).min(1).optional(),
  feedback: Joi.string().max(2000).optional()
}).or("criterionScores", "feedback");

export const hackathonIdParamValidation = Joi.object({
  hackathonId: objectIdHex24.required().messages({
    "string.length": "Hackathon ID must be 24 characters",
    "any.required": "Hackathon ID is required"
  })
});

export const submissionIdParamValidation = Joi.object({
  submissionId: objectIdHex24.required().messages({
    "string.length": "Submission ID must be 24 characters",
    "any.required": "Submission ID is required"
  })
});

export const scoreIdParamValidation = Joi.object({
  scoreId: objectIdHex24.required().messages({
    "string.length": "Score ID must be 24 characters",
    "any.required": "Score ID is required"
  })
});

export { validate, validateParams };
