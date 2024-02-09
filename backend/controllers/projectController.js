import Project from "../models/Project.js";
import Task from "../models/Task.js";

const getProjects = async (req, res) => {
    const projects = await Project.find().where('creator').equals(req.user);

    res.json(projects);
};

const newProject = async (req, res) => {
    const project = new Project(req.body)
    project.creator = req.user._id

    try {
        const warehouseProject = await project.save();
        res.json(warehouseProject);
    } catch (error) {
        console.error(error)
    }
};

const getProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);
    
    if (!project) {
        const error = new Error("Project not found");
        return res.status(404).json({ msg: error.message });
    }

    if(project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid action");
        return res.status(404).json({ msg: error.message });
    }


    
    res.json (
        project,
    );
};

const editProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);
    
    if (!project) {
        const error = new Error("Project not found");
        return res.status(404).json({ msg: error.message });
    }

    if(project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid action");
        return res.status(404).json({ msg: error.message });
    }
    
    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.deliverDate = req.body.deliverDate || project.deliverDate;
    project.customer = req.body.customer || project.customer;
    project.name = req.body.name || project.name;

    try {
        const warehouseProject = await project.save();
        res.json(warehouseProject);
    } catch (error) {
        console.error(error);
        
    }

};

const deleteProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);
    
    if (!project) {
        const error = new Error("Project not found");
        return res.status(404).json({ msg: error.message });
    }

    if(project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid action");
        return res.status(404).json({ msg: error.message });
    }

    try {
        await project.deleteOne();
        res.json({ msg: "Project Deleted"});
    } catch (error) {
        console.log(error);
        
    }
};

const addCollaborator = async (req, res) => {
    
};

const deleteCollaborator = async (req, res) => {
    
};

export {
    getProjects,
    newProject,
    getProject,
    editProject,
    deleteProject,
    addCollaborator,
    deleteCollaborator,
}
