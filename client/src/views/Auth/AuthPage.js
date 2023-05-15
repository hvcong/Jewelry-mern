import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../store/contexts/AuthContext";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import { useGlobalContext } from "../../store/contexts/GlobalContext";

function AuthPage({ authRoute }) {
  const { account } = useGlobalContext();

  if (account && account.isLogin) {
    return <Navigate to="/" />;
  }

  return <>{authRoute === "login" ? <LoginPage /> : <RegisterPage />}</>;
}

export default AuthPage;
