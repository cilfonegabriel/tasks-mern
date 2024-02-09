import { useState,useEffect, createContext } from "react"
import customerAxios from "../config/customerAxios"
import { useNavigate } from "react-router-dom"

const ProjectsContext = createContext()

const ProjectsProvider = ({children}) => {

    const[projects, setProjects] = useState([]);
    const[alert, setAlert] = useState([]);

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


    return(
        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert,
                submitProject
            }}
        >{children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext