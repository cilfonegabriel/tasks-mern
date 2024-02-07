import { useState,useEffect, createContext } from "react"
import customerAxios from "../config/customerAxios"
import { useNavigate } from "react-router-dom"

const ProjectsContext = createContext()

const ProjectsProvider = ({children}) => {

    const[projects, setProjects] = useState([]);
    const[alert, setAlert] = useState([]);

    const navigate = useNavigate();

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
            console.log(data)

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