import FormCollaborator from "../components/FormCollaborator"
import { useEffect } from "react"
import useProjects from "../hooks/useProjects"
import { useParams } from "react-router-dom"

const NewCollaborator = () => {

    const { getProject, project, collaborator, loading, addCollaborator } = useProjects()
    const params = useParams()

    useEffect(() => {
        getProject(params.id)
    },[])

    if (loading) return loading
  return (
    <>
      <h1 className="text-4xl font-black">Add Collaborator to the project {project.name}</h1>

      <div className="mt-10 flex justify-center">
        <FormCollaborator />
      </div>

      {loading ? <p className= "text-center">loading...</p> : collaborator?._id &&(
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            <h2 className="text-center mb-10 text-2xl font-bold">Result: </h2>

            <div className="flex justify-between items-center">
              <p>{collaborator.name}</p>

              <button
                type="button"
                className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                onClick={() => addCollaborator({
                  email: collaborator.email
                })}
              >Add to the project</button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default NewCollaborator
