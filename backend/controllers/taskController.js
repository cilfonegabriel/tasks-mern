import Project from "../models/Project.js";
import Task from "../models/Task.js";

const addTask = async (req, res) => {
    const { project } = req.body;

    const projectExists = await Project.findById(project);

    if (!projectExists) {
        const error = new Error("The Project does not exist");
        return res.status(404).json({ msg: error.message });
    }

    if(projectExists.creator.toString() !== req.user._id.toString()){
        const error = new Error("You do not have permissions to add tasks.");
        return res.status(403).json({ msg: error.message });
    }

    try {
        const storeTask = await Task.create(req.body);
        projectExists.tasks.push(storeTask._id);
        await projectExists.save();
        res.json(storeTask);
    } catch (error) {
        console.log(error);
    }
};

const getTask = async (req, res) => {
    const  { id } = req.params;

    const task = await Task.findById(id).populate("project");

    if(!task) {
        const error = new Error("Task not found");
        return res.status(404).json({ msg: error.message });
    }

    if(task.project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid action.");
        return res.status(403).json({ msg: error.message });
    }

    res.json(task);
}

const updateTask = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id).populate("project");

    if(!task) {
        const error = new Error("Task not found");
        return res.status(404).json({ msg: error.message });
    }

    if(task.project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid action.");
        return res.status(403).json({ msg: error.message });
    }
    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;    
    task.deliverDate = req.body.deliverDate || task.deliverDate;

    try {
        const storeTask = await task.save();
        res.json(storeTask);
    } catch (error) {
        console.error(error)
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id).populate("project");

    if(!task) {
        const error = new Error("Task not found");
        return res.status(404).json({ msg: error.message });
    }

    if(task.project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid action.");
        return res.status(403).json({ msg: error.message });
    }

    try {
        const project = await Project.findById(task.project)
        project.tasks.pull(task._id);
        
        await Promise.allSettled([await project.save(), await task.deleteOne()]);

        res.json({ msg: "The task was deleted" });
    } catch (error) {
        console.log(error);
    }
}

const changeStatus = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id).populate("project");

    if(!task) {
        const error = new Error("Task not found");
        return res.status(404).json({ msg: error.message });
    }

    if(task.project.creator.toString() !== req.user._id.toString()
    && !task.project.collaborators.some((collaborator) => collaborator._id
        .toString() === req.user._id.toString()))
    {
        const error = new Error("Invalid action.");
        return res.status(403).json({ msg: error.message });
    }
    task.state = !task.state;
    await task.save();
    res.json(task);
}

export {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    changeStatus,
}