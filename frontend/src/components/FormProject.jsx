import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import Alert from "./Alert"

const FormProject = () => {
    const [id, setId] =useState(null)
    const [name, setName] =useState('')
    const [description, setDescription] =useState('')
    const [deliverDate, setDeliverDate] =useState('')
    const [customer, setCustomer] =useState('')

    const params = useParams()
    
    const {showAlert, alert, submitProject, project} = useProjects()

    useEffect(() => {
        if(params.id){
            setId(project._id)
            setName(project.name)
            setDescription(project.description)
            setDeliverDate(project.deliverDate?.split('T')[0])
            setCustomer(project.customer)
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault();

        if([name, description, deliverDate, customer].includes('')){
            showAlert({
                msg: 'All fields are required',
                error: true,
            })
            return
        }
        await submitProject({id, name, description, deliverDate, customer})

        setId(null)
        setName('')
        setDescription('')
        setDeliverDate('')
        setCustomer('')
    }

    const { msg } = alert

    return (
        <form 
            className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
            onSubmit={handleSubmit}
        >
            {msg && <Alert alert={alert} />}
            <div className="mb-5">
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='name'
                >
                    Name Project
                </label>

                <input
                    id='name'
                    type='text'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Name of the Project'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='description'
                >
                    Description
                </label>

                <textarea
                    id='description'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Description of the Project'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='deliver-date'
                >
                    Deadline
                </label>

                <input
                    id='deliver-date'
                    type='date'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={deliverDate}
                    onChange={e => setDeliverDate(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='customer'
                >
                    Name Customer
                </label>

                <input
                    id='customer'
                    type='text'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Name of the customer'
                    value={customer}
                    onChange={e => setCustomer(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value={id ? "Update Project" : "Create Project"}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    )
}

export default FormProject
