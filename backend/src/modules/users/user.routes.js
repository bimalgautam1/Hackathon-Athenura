/**
  user.routes.js
  Defines Express routes for the user domain.
 */
import { Router } from "express"
import userController from './user.controller.js'
import { verifyJWT } from '../../middleware/auth.middleware.js'
import asyncHandler from '../../libs/asyncHandler.js'
import { validate, updateProfileValidation } from './user.validation.js'

const router = Router()

router.route("/me").get(verifyJWT, asyncHandler(userController.getProfile))
router.route("/me").patch(verifyJWT, validate(updateProfileValidation), asyncHandler(userController.updateProfile))

export default router