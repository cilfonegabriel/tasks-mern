import express from 'express';
import { 
    getProjects,
    newProject,
    getProject,
    editProject,
    deleteProject,
    addCollaborator,
    deleteCollaborator,
    getTasks,
 } from "../controllers/projectController";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get('/')

export default router;
 