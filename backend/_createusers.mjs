import 'dotenv/config';
import mongoose from 'mongoose';

// Import the actual User model so pre-save hook hashes password
import User from './src/modules/users/user.model.js';

await mongoose.connect(process.env.MONGODB_URL);

// Create judge
try {
  const judge = new User({
    fullName: 'Test Judge',
    email: 'testjudge3@test.com',
    password: 'Test@1234',
    phone: 8888777764,
    dateOfBirth: new Date('1995-01-01'),
    collegeOrUniversity: 'Judge University',
    graduationYear: 2020,
    gender: 'Male',
    role: 'Judge',
    isEmailVerified: true,
    isActive: true,
  });
  await judge.save();
  console.log('JUDGE_ID=' + judge._id.toString());
} catch(e) { console.log('Judge error: ' + e.message); }

// Create admin
try {
  const admin = new User({
    fullName: 'Test Admin',
    email: 'testadmin3@test.com',
    password: 'Test@1234',
    phone: 7777666654,
    dateOfBirth: new Date('1990-01-01'),
    collegeOrUniversity: 'Admin University',
    graduationYear: 2015,
    gender: 'Male',
    role: 'Admin',
    isEmailVerified: true,
    isActive: true,
  });
  await admin.save();
  console.log('ADMIN_ID=' + admin._id.toString());
} catch(e) { console.log('Admin error: ' + e.message); }

process.exit(0);
