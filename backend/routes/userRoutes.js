import express from 'express';

const router = express.Router();

import { register } from '../controllers/userController.js';

// Authentication, confirmation, and user registration.
router.post('/', register); //Create a new user
router.post('/login', authenticate);

export default router;