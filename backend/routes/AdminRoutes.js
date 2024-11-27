import express from 'express';
import { Getuser, deletUser, addUser, updateUserRole, updateUserPermissions } from '../controllers/Admin.js';
import { isAdmin, isSubAdmin } from '../middleware/verifyToken.js';

const AdminRoutes = express.Router();

// Routes for managing users
AdminRoutes.get('/getuser', isAdmin, Getuser); // Fetch all users
AdminRoutes.delete('/delete/:id', isAdmin, deletUser); // Delete a user
AdminRoutes.post('/adduser', isAdmin, addUser); // Add a new user
AdminRoutes.post('/update/:id', isAdmin, updateUserRole); // Update user role and permission
AdminRoutes.delete('/delete/:id', isSubAdmin, deletUser); // Delete a user
AdminRoutes.post('/adduser', isSubAdmin, addUser); // Add a new user

export default AdminRoutes;




