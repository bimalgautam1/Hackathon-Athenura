/**
  user.model.js
  Defines the Mongoose schema and model for user records.
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRoles, userRolesEnums } from "./user.constants.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email format is incorrect. Use a valid format such as name@example.com (e.g., jane.smith@gmail.com) .",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone no. is required"],
      unique: true,
    },
    dob: {
      type: Date,
      required: [true, "Date of Birth is required"],
    },
    clgOrUni: {
      type: String,
      required: [true, "College or University is required"],
    },
    graduationYear: {
      type: Date,
      required: [true, "Graduation Year is required"],
    },
    skills: {
      type: [String],
      default: [],
    },
    resumeLink: {
      type: String,
    },
    role: {
      type: String,
      enum: userRolesEnums,
      required: true,
      default: userRoles.USER,
    },
    refreshToken: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVarificationTokan: {
      type: String,
    },
    emailVarificationExpiry: {
      type: Date,
    },
    emailOtp: {
      type: String,
    },
    emailOtpExpiry: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    fullName: this.fullName,
    email: this.email,
    phone: this.phone,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

userSchema.methods.generateRefreshToken = function () {
  const payload = {
    _id: this._id,
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

userSchema.methons.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() * 10 * 60 * 1000;

  return {
    unHashedToken,
    hashedToken,
    tokenExpiry,
  };
};


const User = mongoose.model("User",userschema)
export default User;