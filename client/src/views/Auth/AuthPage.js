
import { Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuthContext } from "../../store/contexts/AuthContext"
import LoginPage from "./LoginPage/LoginPage"
import RegisterPage from "./RegisterPage/RegisterPage"

function AuthPage({ authRoute }) {

    const { isAuthenticated } = useAuthContext()



    return (
        <>
            {authRoute === 'login' ? <LoginPage /> : <RegisterPage />}
        </>
    )
}

export default AuthPage