import mongoose from 'mongoose';
const conn = await mongoose.connect('mongodb://127.0.0.1:27017/hackathon');
const user = await conn.connection.db.collection('users').findOne({email:'phase3test@test.com'});
const token = await conn.connection.db.collection('tokens').findOne({userId: user._id, type:'Otp'});
console.log(token.token);
process.exit(0);
