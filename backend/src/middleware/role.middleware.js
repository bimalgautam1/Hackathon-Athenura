/**
  role.middleware.js
  Restricts routes by role, such as admin-only, judge-only, or university-only access
 */
import ApiError from "../libs/apiError.js"
import asyncHandler from "../libs/asyncHandler.js"

export const restrictTo = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
    // Check if user is authenticated (req.user should be set by auth.middleware)
    if (!req.user) {
      throw new ApiError(401, "Please login to access this resource")
    }
    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(
        403,
        'You do not have permission to perform this action.'
      )
    }
    next()
  })
}