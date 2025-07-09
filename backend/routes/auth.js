import express from 'express'
const router = express.Router();
import authController from '../controllers/authController.js';
import  authenticateToken  from '../middleware/auth.js';
import {
  registerValidator,
  loginValidator,
  updateProfileValidator,
  changePasswordValidator
} from '../validators/authValidator.js';


// Public routes
router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);

// Protected routes
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, updateProfileValidator, authController.updateProfile);
router.put('/change-password', authenticateToken, changePasswordValidator, authController.changePassword);

export default router;