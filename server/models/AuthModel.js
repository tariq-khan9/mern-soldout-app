
import mongoose from 'mongoose';
const {Schema}  = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  createdAt: {type: Date, default: Date.now}
}, {timestamps: true});

export default new mongoose.model('User', userSchema);