import express from 'express';
import UserModel from '../models/user.js'; // Replace with the actual path to your user model
import { verifyToken } from '../middleware/verifyToken.js'
const router = express.Router();



// GET /api/auth/getRole
router.get('/getRole', verifyToken, async (req, res) => {
  try {
    // Assuming the user ID is retrieved from the authentication middleware

    const userId = req.user.id; // Make sure `req.user` is set by your middleware
    console.log(userId)
    // Fetch user from the database
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user's role
    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ message: 'Error fetching user role', error: error.message });
  }
});

export default router;
