# Admin APIs Documentation

## API #1: List All Users


GET http://localhost:5000/api/v1/admin/users


Headers:

Authorization: Bearer <access_token>


Response (200):
json
{
    success: true,
    data: [
        {
            _id: "user-id-1",
            email: "user@example.com",
            firstName: "John",
            lastName: "Doe",
            role: "user",
            status: "active"
        }
    ]
}




## API #2: Get User Details by ID


GET http://localhost:5000/api/v1/admin/users/:userId


Headers:

Authorization: Bearer <access_token>


Response (200):
json
{
    success: true,
    data: {
        _id: "507f1f77bcf86cd799439011",
        email: "user@example.com",
        firstName: "John",
        lastName: "Doe",
        role: "user",
        status: "active",
        university: "IIT Delhi",
        createdAt: "2026-05-07T10:30:00Z"
    }
}




## API #3: Suspend User


PATCH http://localhost:5000/api/v1/admin/users/:userId/suspend


Headers:

Authorization: Bearer <access_token>


Response (200):
json
{
    success: true,
    message: "User suspended successfully",
    data: {
        _id: "507f1f77bcf86cd799439011",
        email: "user@example.com",
        status: "suspended"
    }
}




## API #4: Restore User


PATCH http://localhost:5000/api/v1/admin/users/:userId/restore


Headers:

Authorization: Bearer <access_token>


Response (200):
json
{
    success: true,
    message: "User restored successfully",
    data: {
        _id: "507f1f77bcf86cd799439011",
        email: "user@example.com",
        status: "active"
    }
}




## API #5: Reset User Password


POST http://localhost:5000/api/v1/admin/users/:userId/resetpassword


Headers:

Authorization: Bearer <access_token>
Content-Type: application/json


Payload:
json
{
  "password": "string (required, min 6 chars, must contain uppercase, lowercase, number, special char)"
}


Example Payload:
json
{
  "password": "NewPassword123!"
}


Response (200):
json
{
    success: true,
    message: "Password reset successfully",
    data: {
        _id: "507f1f77bcf86cd799439011",
        email: "user@example.com",
        passwordUpdatedAt: "2026-05-07T10:35:00Z"
    }
}




## API #6: Get Admin Settings


GET http://localhost:5000/api/v1/admin/settings


Headers:

Authorization: Bearer <access_token>


Response (200):
json
{
    success: true,
    data: {
        _id: "settings-id",
        paymentMethod: "razorpay",
        maintenanceMode: false,
        emailNotificationsEnabled: true,
        maxRegistrationsPerUser: 3,
        updatedAt: "2026-05-07T10:30:00Z"
    }
}




## API #7: Update Payment Configuration


PATCH http://localhost:5000/api/v1/admin/settings/payment


Headers:

Authorization: Bearer <access_token>
Content-Type: application/json


Payload:
json
{
  "paymentMethod": "string (required, allowed: razorpay, stripe, paypal)",
  "razorpayApiKey": "string (optional)",
  "razorpayApiSecret": "string (optional)",
  "currencyCode": "string (optional)",
  "transactionFee": "number (optional)"
}


Example Payload:
json
{
    paymentMethod: "razorpay",
    razorpayApiKey: "rzp_live_xxxxx",
    razorpayApiSecret: "xxxxx",
    currencyCode: "INR",
    transactionFee: 2.5
}


Response (200):
json
{
    success: true,
    message: "Payment settings updated successfully",
    data: {
        _id: "settings-id",
        paymentMethod: "razorpay",
        currencyCode: "INR",
        transactionFee: 2.5,
        updatedAt: "2026-05-07T10:40:00Z"
    }
}




## API #8: Forgot Password


POST http://localhost:5000/api/v1/auth/forgot-password


Headers:

Content-Type: application/json


Payload:
json
{
  "email": "string (required, valid email format)"
}


Example Payload:
json
{
  "email": "user@example.com"
}


Response (200):
json
{
  "success": true,
  "message": "Password reset email sent successfully"
}




## API #9: Reset Password


POST http://localhost:5000/api/v1/auth/reset-password


Headers:

Content-Type: application/json


Payload:
json
{
  "token": "string (required, reset token from email)",
  "newPassword": "string (required, min 8 characters)"
}


Example Payload:
json
{
  "token": "reset_token_here",
  "newPassword": "newpassword123"
}


Response (200):
json
{
  "success": true,
  "message": "Password reset successfully"
}




## API #10: Verify Email


POST http://localhost:5000/api/v1/auth/verify-email/:token


Headers:

Content-Type: application/json


Payload:
json
{
  "email": "string (optional, email to verify)"
}


Example Payload:
json
{
  "email": "user@example.com"
}


Response (200):
json
{
  "success": true,
  "message": "Email verified successfully"
}




## API #11: Get Current User Profile


GET http://localhost:5000/api/v1/users/me


Headers:

Authorization: Bearer <access_token>


Response (200):
json
{
  "success": true,
  "data": {
    "_id": "user_object_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": 9876543210,
    "dateOfBirth": "1995-05-15T00:00:00.000Z",
    "collegeOrUniversity": "Example University",
    "graduationYear": 2025,
    "skills": ["JavaScript", "React", "Node.js"],
    "resumeLink": "https://example.com/resume.pdf",
    "gender": "Male",
    "role": "user",
    "isEmailVerified": true,
    "isSuspended": false,
    "createdAt": "2026-05-06T14:00:00.000Z",
    "updatedAt": "2026-05-06T14:00:00.000Z"
  }
}




## API #12: Update User Profile


PATCH http://localhost:5000/api/users/me


Headers:

Authorization: Bearer <access_token>
Content-Type: application/json


Payload:
json
{
  "fullName": "string (optional, min 2, max 100 chars)",
  "phone": "number (optional, positive integer)",
  "dateOfBirth": "date (optional, must be in past)",
  "collegeOrUniversity": "string (optional, max 200 chars)",
  "graduationYear": "number (optional, 1900 to current_year + 10)",
  "skills": "array of strings or comma-separated string (optional)",
  "resumeLink": "string (optional, valid URL)"
}


Example Payload:
json
{
  "fullName": "Updated Name",
  "phone": 9876543210,
  "skills": ["JavaScript", "React"]
}


Response (200):
json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "user_object_id",
    "fullName": "Updated Name",
    "email": "john@example.com",
    "phone": 9876543210,
    "skills": ["JavaScript", "React"],
    "updatedAt": "2026-05-06T15:00:00.000Z"
  }
}
