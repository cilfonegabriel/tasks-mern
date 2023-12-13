import express from 'express';

const router = express.Router();

import { register, authenticate, confirm, forgotPassword, checkToken,newPassword } from '../controllers/userController.js';

// Authentication, confirmation, and user registration.
router.post('/', register); //Create a new user
router.post('/login', authenticate);
router.get('/confirm/:token', confirm);
router.post("/forgotten-password", forgotPassword);
router.get("/forgotten-password/:token", checkToken);
router.post("/forgotten-password/:token", newPassword);


export default router;