import express from 'express';

const router = express.Router();

import { register, authenticate, confirm, forgotPassword, checkToken } from '../controllers/userController.js';

// Authentication, confirmation, and user registration.
router.post('/', register); //Create a new user
router.post('/login', authenticate);
router.get('/confirm/:token', confirm);
router.post("/forgotten-password", forgotPassword);
router.get("/forgotten-password/:token", checkToken);


export default router;