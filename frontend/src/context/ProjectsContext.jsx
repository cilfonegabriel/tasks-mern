import { useState,useEffect, createContext } from "react"
import customerAxios from "../config/customerAxios"
import { useNavigate } from "react-router-dom"

const ProjectsContext = createContext()

const ProjectsProvider = ({children}) => {

    const[projects, setProjects] = useState([]);
    const[alert, setAlert] = useState({});
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalFormTask, setModalFormTask] = useState(false);


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
        } catch (error) {
            console.log(error)
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
    }

    const submitTask = async task => {
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
                submitTask
            }}
        >{children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext