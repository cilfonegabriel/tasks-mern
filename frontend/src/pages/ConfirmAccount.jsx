import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import customerAxios from "../config/customerAxios"
import Alert from "../components/Alert"

const ConfirmAccount = () => {

  const [alert, setAlert] = useState({})
  const [accountConfirm, setAccountConfirm] = useState(false)

  const params = useParams();

  const { id } = params
  
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`
        const { data } = await customerAxios(url)
        
        setAlert({
          msg: data.msg,
          error: false
        })
        setAccountConfirm(true)

      } catch (error) {
        setAlert({
          msg:error.response.data.msg,
          error: true
        })
      }
    }
    confirmAccount();
  }, [])

  const { msg } = alert

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Confirm your account and start creating your {""}
        <span className="text-slate-700">projects</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}

        {accountConfirm && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >Log in</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount
