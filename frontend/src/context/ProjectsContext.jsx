import { useState,useEffect, createContext } from "react"
import customerAxios from "../config/customerAxios"

const ProjectsContext = createContext()

const ProjectsProvider = ({children}) => {

    return(
        <ProjectsContext.Provider
            value={{

            }}
        >{children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext