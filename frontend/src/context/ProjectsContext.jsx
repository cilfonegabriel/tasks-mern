import { useState,useEffect, createContext } from "react"
import customerAxios from "../config/customerAxios"

const ProjectsContext = createContext()

const ProjectsProvider = ({children}) => {

    const[projects, setProjects] = useState([]);
    const[alert, setAlert] = useState([]);

    const showAlert = alert => {
        setAlert(alert);

        setTimeout(() => {
            setAlert({})
        }, 5000);
    }


    return(
        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert
            }}
        >{children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext