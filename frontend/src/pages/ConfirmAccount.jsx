import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Alert from "../components/Alert"

const ConfirmAccount = () => {

  const params = useParams();

  const { id } = params
  
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `http://localhost:4000/api/users/confirm/${id}`
      } catch (error) {
        console.log(error)
      }
    }
    confirmAccount();
  }, [])

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Confirm your account and start creating your {""}
        <span className="text-slate-700">projects</span>
      </h1>
    </>

  )
}

export default ConfirmAccount
