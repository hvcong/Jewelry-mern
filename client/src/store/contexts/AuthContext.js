import dotenv from "dotenv";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import { useGlobalContext } from "./GlobalContext";
dotenv.config();

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: {},
    accessToken: "",
    isAuthenticated: false,
    isLoadingAuth: true,
  });

  const { setIsSpinnerLoading } = useGlobalContext();

  //function
  async function loadUser() {
    setIsSpinnerLoading(true);
    let accessToken = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);

    if (accessToken) {
      let response = await authApi.checkAccessToken();
      if (response.success) {
        toast.success("Đăng nhập thành công");
        setAuthState({
          ...authState,
          user: response.user,
          accessToken: accessToken,
          isAuthenticated: true,
          isLoadingAuth: false,
        });
      } else {
        localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN);
      }
    }
    setIsSpinnerLoading(false);
  }

  async function login(account) {
    setIsSpinnerLoading(true);
    const response = await authApi.login(account);
    setIsSpinnerLoading(false);

    if (response.success) {
      toast.success("Đăng nhập thành công");
      localStorage.setItem(
        process.env.REACT_APP_ACCESS_TOKEN,
        response.accessToken
      );
      setAuthState({
        user: response.user,
        accessToken: response.accessToken,
        isAuthenticated: true,
        isLoadingAuth: false,
      });

      return response.user;
    } else {
      toast.error(`Tài khoản hoặc mật khẩu không chính xác`);
      return false;
    }
  }

  async function register(registerData) {
    setIsSpinnerLoading(true);
    const response = await authApi.register(registerData);
    setIsSpinnerLoading(false);
    const { numError } = response;

    if (response.success) {
      toast.success("Đăng kí thành công");

      localStorage.setItem(
        process.env.REACT_APP_ACCESS_TOKEN,
        response.accessToken
      );

      setAuthState({
        ...authState,
        user: response.newUser,
        accessToken: response.accessToken,
        isAuthenticated: true,
        isLoadingAuth: false,
      });
      return true;
    } else {
      if (numError === 1) {
        toast.error("Vui lòng điền đầy đủ thông tin");
        return false;
      }
      if (numError === 2) {
        toast.error("Tài khoản đã tồn tại, vui lòng thử lại");
        return false;
      }
      if (numError === 3) {
        toast.error("Tài khoản hoặc mật khẩu không hợp lệ");
        return false;
      }

      toast.error("Đường truyền không ổn định, vui lòng thử lại");
      return false;
    }
  }

  function logout() {
    toast.success("Đã đăng xuất");
    localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN);

    setAuthState({
      user: {},
      accessToken: "",
      isAuthenticated: false,
      isLoading: false,
    });
  }

  const AuthContextData = {
    login,
    register,
    logout,
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoadingAuth: authState.isLoadingAuth,
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export function useAuthContext() {
  return useContext(AuthContext);
}
