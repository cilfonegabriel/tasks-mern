import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import ModalFormTask from "../components/ModalFormTask.jsx"
import ModalDeleteTask from "../components/ModalDeleteTask.jsx"
import Task from "../components/Task.jsx"
import Alert from "../components/Alert.jsx"
import Collaborator from "../components/Collaborator.jsx"
import ModalDeleteCollaborator from "../components/ModalDeleteCollaborator.jsx"

const Project = () => {

    const params = useParams()

    const { getProject, project, loading, handleModalTask, alert  } = useProjects()

    useEffect (() => {
        getProject(params.id)
    },[])
    
    const { name } = project

    if (loading) return 'Loading...'

    const {msg} = alert
    return (
        <>
            <div className="flex justify-between">
                    <h1 className="font-black text-4xl">{name}</h1>
                    <div className="flex items-center gap-2 text-gray-400 hover:text-black" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                        <Link
                            to={`/projects/edit/${params.id}`}
                            className="uppercase font-bold"
                        >Edit</Link>
                    </div>
            </div>

            <button 
                onClick={handleModalTask}
                type="button"
                className="font-bold uppercase text-sm px-5 py-3 w-full md:w-auto rounded-lg bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            New task</button>     

            <p className="font-bold text-xl mt-10">Tasks of the Project</p>

            <div className="flex justify-center">
                <div className="w-full md:w1/3 lg:w-1/4">
                    {msg && <Alert alert={alert} />}
                </div>
            </div>


            <div className="bg-white shadow mt-10 rounded-lg">
                {project.tasks?.length ?
                    project.tasks.map(task => (
                        <Task 
                            key={task._id}
                            task={task}
                        />
                    )):
                <p className="text-center my-5 p-10">There arent tasks in this Project</p>}
            </div>

            <div className="flex items-center justify-between mt-10">
                <p className="font-bold text-xl">Collaborators</p>
                <Link
                    to={`/projects/new-collaborator/${project._id}`}
                    className="text-gray-400 hover:text-black uppercase font-bold"
                >Add</Link>
            </div>

            <div className="bg-white shadow mt-10 rounded-lg">
                {project.collaborators?.length ?
                    project.collaborators?.map(collaborator => (
                        <Collaborator
                            key={collaborator._id}
                            collaborator={collaborator}
                        />
                    )):
                <p className="text-center my-5 p-10">There arent Collaborators in this Project</p>}
            </div>
            


            <ModalFormTask />
            <ModalDeleteTask />
            <ModalDeleteCollaborator />
        </>
           
    )
}

export default Project
