import { useState } from "react"

const FormProject = () => {

    const [name, setName] =useState('')
    const [description, setDescription] =useState('')
    const [deliverDate, setDeliverDate] =useState('')
    const [customer, setCustomer] =useState('')

    return (
        <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
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
        </form>
    )
}

export default FormProject
