/**
 * notification.validation.js
 * Declares request payload validation rules using Joi for notification routes.
 */
import Joi from 'joi';

// Schema validating array of ObjectIds for bulk mark-as-read operations
export const markBulkReadValidation = Joi.object({
  ids: Joi.array()
    .items(
      Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
          'string.hex': 'Each notification ID must be a valid hex string',
          'string.length': 'Each notification ID must be exactly 24 characters'
        })
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one notification ID must be specified',
      'any.required': 'Notification IDs list (ids) is required'
    })
});

// Generic validation middleware factory matching teams module
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorMessage
      });
    }

    req.body = value;
    next();
  };
};
