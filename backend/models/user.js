import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['admin', 'subadmin', 'user'],
    default: "user",
  },
  password: { type: String, required: true },
  permissions: {
    type: String, // Array of permissions
    enum: ['read', 'write', 'delete'],
    default: 'read', // Default permissions
  },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
export default UserModel;

