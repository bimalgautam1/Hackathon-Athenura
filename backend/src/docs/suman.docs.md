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
