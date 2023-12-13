import express from 'express';

const router = express.Router();

import { register, authenticate, confirm, forgotPassword, checkToken,newPassword, profile } from '../controllers/userController.js';

import checkAuth from '../middleware/checkAuth.js';

// Authentication, confirmation, and user registration.
router.post('/', register); //Create a new user
router.post('/login', authenticate);
router.get('/confirm/:token', confirm);
router.post("/forgotten-password", forgotPassword);
router.route("/forgotten-password/:token").get(checkToken).post(newPassword);
router.get("/profile", checkAuth, profile);

export default router;