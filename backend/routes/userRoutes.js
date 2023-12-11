import express from 'express';

const router = express.Router();

import { users } from '../controllers/userController.js';

router.get('/', users)

export default router;