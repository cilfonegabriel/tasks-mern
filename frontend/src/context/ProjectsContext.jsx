import { useState,useEffect, createContext } from "react"
import customerAxios from "../config/customerAxios"
import { useNavigate } from "react-router-dom"

const ProjectsContext = createContext()

const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalFormTask, setModalFormTask] = useState(false);
    const [task, setTask] = useState({});
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [collaborator, setCollaborator] = useState({});
    const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getProject = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`,
                    }
                }  
                const {data} = await customerAxios('/projects', config)    
                setProjects(data)
            } catch (error) {
                console.error(error);
            }
        }
        getProject();
    }, [])

    const showAlert = alert => {
        setAlert(alert);

        setTimeout(() => {
            setAlert({})
        }, 5000);
    }

    const submitProject = async project => {

        if(project.id){
            await editProject(project)
        } else {
            await newProject(project)
        }        
    }

    const editProject = async project => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }

            const { data } = await customerAxios.put(`/projectS/${project.id}`, project, config)
            
            const projectsUpdate = projects.map(projectState => projectState._id === data._id ? data : projectState)
            setProjects(projectsUpdate)

            setAlert({
                msg:'Project Update successfully',
                error:false,
            })

            setTimeout(() => {
                setAlert({})
                navigate('/projects')
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }

    const newProject = async project => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }

            const { data } = await customerAxios.post('/projects', project, config)
           setProjects([...projects,data])

            setAlert({
                msg:'Project created successfully',
                error:false,
            })

            setTimeout(() => {
                setAlert({})
                navigate('/projects')
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    const getProject = async id => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }

            const { data } = await customerAxios(`/projects/${id}`, config)
            setProject(data)
            setAlert({})
        } catch (error) {
            navigate('/projects')
            setAlert({
                msg: error.response.message,
                error: true,
            })

            setTimeout (() => {
                setAlert({});
            }, 3000)
        } finally {
            setLoading(false)
        }
    }

    const deleteProject = async id => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }

            const { data } = await customerAxios.delete(`/projects/${id}`, config)

            const projectsUpdate = projects.filter(projectState => projectState._id !== id)

            setProjects(projectsUpdate)
            setAlert({
                msg: data.msg,
                error: false,
            })

            setTimeout(() => {
                setAlert({})
                navigate('/projects')
            }, 2000);
        } catch (error) {
            console.log("error")
        }
    }

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask);
        setTask({})
    }

    const submitTask = async task => {

        if(task?.id) {
           await editTask(task)
        } else{
            await createTask(task)
        }
    }
    
    const createTask = async task => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }
    
            const { data } = await customerAxios.post('/tasks', task, config);
    
            //Add the task to the state
            const updatedProject = { ...project }
            updatedProject.tasks = [...project.tasks, data]
            setProject(updatedProject)
            setAlert({})
            setModalFormTask(false)
        } catch (error) {
            console.error(error)
        }
    }
    

    const editTask = async task => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }

            const { data } = await customerAxios.put(`/tasks/${task.id}`, task, config)

            const projectUpdate = {...project}
            projectUpdate.tasks = projectUpdate.tasks.map(taskState => taskState._id === data._id ? data : taskState)
            setProject(projectUpdate)
            setAlert({})
            setModalFormTask(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleModalEditTask = task => {
        setTask(task)
        setModalFormTask(true)
    }

    const handleModalDeleteTask = task => {
        setTask(task)
        setModalDeleteTask(!modalDeleteTask)
    }

    const deleteTask = async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }

            const { data } = await customerAxios.delete(`/tasks/${task._id}`, config)
            setAlert({
                msg: data.msg,
                error: false,
            })

            const projectUpdate = {...project}
            projectUpdate.tasks = projectUpdate.tasks.filter(taskState => taskState._id !== task._id)

            setProject(projectUpdate)
            setModalDeleteTask(false)
            setTask({})
            setTimeout(() => {
                setAlert({});
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const submitCollaborator = async email => {

        setLoading(true)

        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }

            const { data } = await customerAxios.post('/projects/collaborators', {email}, config)

            setCollaborator(data)
            setAlert({})
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true,
            })

        } finally {
            setLoading(false)
        }
    }

    const addCollaborator = async email => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }

            const { data } = await customerAxios.post(`/projects/collaborators/${project._id}`, email, config)

            setAlert({
                msg: data.msg,
                error: false
            })

            setCollaborator({})

            setTimeout(() => {
                setAlert({})
            }, 3000)

        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true,
            })
        }
    }

    const handleModalDeleteCollaborator = (collaborator) => {
        setModalDeleteCollaborator(!modalDeleteCollaborator)
        setCollaborator(collaborator)
    }

    const deleteCollaborator = async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }

            const { data } = await customerAxios.post(`/projects/delete-collaborator/${project._id}`, {id: collaborator._id}, config)

            const projectUpdate={...project}

            projectUpdate.collaborators = projectUpdate.collaborators.filter(collaboratorState => collaboratorState._id !== collaborator._id)

            setProject(projectUpdate)

            setAlert({
                msg:data.msg,
                error: false,
            })

            setCollaborator({})
            setModalDeleteCollaborator(false)

            setTimeout(() => {
                setAlert({})
            }, 3000)

        } catch (error) {
            console.error(error.response);
        }
    }

    const completeTask = async id => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }

            const { data } = await customerAxios.post(`/tasks/state/${id}`, {}, config)
            const projectUpdate = {...project}
            projectUpdate.tasks = projectUpdate.tasks.map(taskState => taskState._id === data._id ? data : taskState)

            setProject(projectUpdate)
            setTask({})
            setAlert({})

       } catch (error) {
            console.log(error.response)
        }
    }

    return(
        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert,
                submitProject,
                getProject,
                project,
                loading,
                deleteProject,
                modalFormTask,
                handleModalTask,
                submitTask,
                handleModalEditTask,
                task,
                modalDeleteTask,
                handleModalDeleteTask,
                deleteTask,
                submitCollaborator,
                collaborator,
                addCollaborator,
                handleModalDeleteCollaborator,
                modalDeleteCollaborator,
                deleteCollaborator,
                completeTask,
            }}
        >{children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext