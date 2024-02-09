import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProjects from "../hooks/useProjects"

const Project = () => {

    const params = useParams()

    const { getProject } = useProjects()

    useEffect (() => {
        getProject(params.id)
    },[])
    

    return (
        <div>
            sdaasd
        </div>
    )
}

export default Project
