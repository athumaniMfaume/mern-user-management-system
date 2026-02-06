import express from 'express';
import { verifyRole, verifyToken } from '../middleware/authMiddleware.js';
import { 
  getUsers, 
  addUser,    // ✅ Now this exists in userController.js
  updateUser, 
  deleteUser, 
  getProfile 
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', verifyToken, verifyRole('admin'), getUsers);
router.post('/', verifyToken, verifyRole('admin'), addUser);
router.put('/admin-edit/:id', verifyToken, verifyRole('admin'), updateUser);
router.put('/profile/update', verifyToken, updateUser);
router.delete('/:id', verifyToken, verifyRole('admin'), deleteUser);
router.get('/me', verifyToken, getProfile);

export default router;


