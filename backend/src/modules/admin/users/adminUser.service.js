/**
  adminUser.service.js
  Contains the core business rules for adminUser.
 */
import User from '../../users/user.model.js'
import mongoose from 'mongoose'

/**
 * Generate a strong password that meets validation requirements:
 * - Minimum 6 characters
 * - Contains at least one uppercase letter
 * - Contains at least one special character
 */
const generateStrongPassword = () => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const special = '!@#$%^&*()_+-=[]{};\'":\\|,.<>/?'
  const allChars = uppercase + lowercase + numbers + special
  
  let password = ''
  
  // Ensure at least one uppercase letter
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  
  // Ensure at least one special character
  password += special[Math.floor(Math.random() * special.length)]
  
  // Fill remaining characters randomly
  for (let i = 0; i < 10; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}

class AdminUserService {
  async listUsers({ page = 1, limit = 20 } = {}) {
    const skip = (page - 1) * limit
    const [users, total] = await Promise.all([
      User.find()
        .select('-password -refreshToken')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(),
    ])

    return {
      users,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  async getUserById(userId) {
    return User.findById(userId).select('-password -refreshToken').lean()
  }

  async suspendUser(userId) {
    return User.findByIdAndUpdate(
      userId,
      { isSuspended: true },
      { new: true, strict: false }
    )
      .select('-password -refreshToken')
      .lean()
  }

  async restoreUser(userId) {
    return User.findByIdAndUpdate(
      userId,
      { isSuspended: false },
      { new: true, strict: false }
    )
      .select('-password -refreshToken')
      .lean()
  }

  async resetUserPassword(userId, password) {
    if (!mongoose.isValidObjectId(userId)) {
      return null
    }

    const user = await User.findById(userId)
    if (!user) {
      return null
    }

    const newPassword = password || generateStrongPassword()
    user.password = newPassword
    await user.save()

    const safeUser = user.toObject()
    delete safeUser.password
    delete safeUser.refreshToken

    return {
      user: safeUser,
      generatedPassword: password ? undefined : newPassword,
    }
  }
}

const adminUserService = new AdminUserService()
export default adminUserService
