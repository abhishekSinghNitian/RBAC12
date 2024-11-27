import UserModel from '../models/user.js';

// Fetch all users
const Getuser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};

// Delete a user
const deletUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const checkAdmin = await UserModel.findById(userId);
    const loggedInUser = req.user;

    if (checkAdmin.role === 'admin' && checkAdmin._id.toString() === loggedInUser._id.toString()) {
      return res.status(409).json({ message: 'Admins cannot delete their own account.' });
    }

    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};

// Add a new user
const addUser = async (req, res) => {
  try {
    const { name, email, role, permissions } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ message: 'Name, email, and role are required.' });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const newUser = new UserModel({ name, email, role: role || 'user', permissions });
    await newUser.save();

    res.status(201).json({ message: 'User added successfully.', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};

// Update a user's role
const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role, permissions } = req.body;

    if (!role && !permissions) {
      return res.status(400).json({ message: 'Role or permissions are required.' });
    }
    console.log("before updation")
    const user = await UserModel.findByIdAndUpdate(userId, { role: role},{ permissions: permissions},{ new: true });
    console.log("after updation")
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'User updated successfully.', user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};

const updateUserPermissions = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role, permissions } = req.body;

    if (!role && !permissions) {
      return res.status(400).json({ message: 'Role or permissions are required.' });
    }
    console.log("before updation")
    const user = await UserModel.findByIdAndUpdate(userId, { permissions: permissions},{ new: true });
    console.log("after updation")
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'User updated successfully.', user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};




export { Getuser, deletUser, addUser, updateUserRole,updateUserPermissions };

