import User from '../models/User.js';


export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalUsers = await User.countDocuments();
    res.set('X-Total-Count', totalUsers);
    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit);
    res.status(200).json({ users, page, totalPages: Math.ceil(totalUsers / limit) });
    } catch (error) { 

        console.error('Error fetching users', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } 
};

export const deleteUser = async (req, res) => { 
    try {   
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateUserRole = async (req, res) => {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role specified' });
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        ).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user role', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({user});
  }
    catch (error) {
    console.error('Error fetching user profile', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } 
};






