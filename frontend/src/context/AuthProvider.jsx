import { useState, useEffect, createContext } from "react";
import customerAxios from "../config/customerAxios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token');

            if(!token) {
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            try {
                const { data } = await customerAxios('/users/profile', config)
                setAuth(data)
            } catch (error) {
                
            }
        }
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                setAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;