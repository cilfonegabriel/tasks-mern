import FormCollaborator from "../components/FormCollaborator"
import { useEffect } from "react"
import useProjects from "../hooks/useProjects"
import { useParams } from "react-router-dom"

const NewCollaborator = () => {

    const { getProject, project } = useProjects()
    const params = useParams()

    useEffect(() => {
        getProject(params.id)
    })
  return (
    <>
      <h1 className="text-4xl font-black">Add Collaborator to the project {project.name}</h1>

      <div className="mt-10 flex justify-center">
        <FormCollaborator />
      </div>
    </>
  )
}

export default NewCollaborator
