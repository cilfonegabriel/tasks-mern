import React from 'react'
import useProjects from '../hooks/useProjects'

const Projects = () => {

  const {projects} = useProjects()
  console.log(projects)
  
  return (
    <>
      <h1 className='text-4xl font-black'>Projects</h1>
      <div className='bg-white shadow mt-10 rounded-lg'>
        {projects.length ? <p>Si hay proyectos</p> : <p className=' text-center text-gray-600 uppercase p-5'>No hay proyect</p>}
      </div>
    </>
  )
}

export default Projects
