import Project from "../models/Project.js";
import User from "../models/User.js";

const getProjects = async (req, res) => {
    const projects = await Project.find().where('creator').equals(req.user).select("-tasks");

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

    const project = await Project.findById(id).populate('tasks').populate("collaborators", "name email")
    
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
const searchCollaborator = async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({email}).select("-confirm -createdAt -password -token -updatedAt -__v")

    if(!user) {
        const error = new Error("User not found");
        return res.status(404).json({ msg: error.message });
    }

    res.json(user);
};

const addCollaborator = async (req, res) => {
    const { id } = req.params;
 
    if (id.length !== 24) {
        const error = new Error('ID inválido');
        return res.status(400).json({ msg: error.message });
    }
    const project = await Project.findById(id);

    if(!project) {
        const error = new Error('Project not found');
        return res.status(404).json({ msg: error.message });
    }

    if(project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Not valid action');
        return res.status(404).json({ msg: error.message });
    }

    const {email} = req.body;

    const user = await User.findOne({email}).select("-confirm -createdAt -password -token -updatedAt -__v")

    if(!user) {
        const error = new Error("User not found");
        return res.status(404).json({ msg: error.message });
    }

    if(project.creator.toString() === user._id.toString()) {
        const error = new Error("The Project Administrator cannot be a collaborator.");
        return res.status(404).json({ msg: error.message });
    }
    if(project.collaborators.includes(user._id)) {
        const error = new Error("The user already belongs to the project.");
        return res.status(404).json({ msg: error.message });
    }

    project.collaborators.push(user._id);
    await project.save();
    res.json({ msg:"Collaborator successfully added"});
};

const deleteCollaborator = async (req, res) => {
    const { id } = req.params;
 
    if (id.length !== 24) {
        const error = new Error('ID inválido');
        return res.status(400).json({ msg: error.message });
    }
    const project = await Project.findById(id);

    if(!project) {
        const error = new Error('Project not found');
        return res.status(404).json({ msg: error.message });
    }

    if(project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Not valid action');
        return res.status(404).json({ msg: error.message });
    }

    project.collaborators.pull(req.body.id);
    await project.save();
    res.json({ msg:"Collaborator successfully Deleted"});
};

export {
    getProjects,
    newProject,
    getProject,
    editProject,
    deleteProject,
    searchCollaborator,
    addCollaborator,
    deleteCollaborator,
}
