import "./LoginPage.scss";

import login_img from "../../../assets/images/login_img.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../../store/contexts/AuthContext";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthContext();
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  const usernameMessRef = useRef();
  const passwordMessRef = useRef();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [isAuthenticated]);

  const { username, password } = loginInput;

  //function
  function handleOnChangeInput(e) {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "username") {
      usernameMessRef.current.innerText = "";
    }

    if (e.target.name === "password") {
      passwordMessRef.current.innerText = "";
    }
  }

  async function handleOnSubmit() {
    let isCheck = true;

    //validate
    if (!username) {
      usernameMessRef.current.innerText = "Trường này không được bỏ trống";
      isCheck = false;
    }

    if (!password) {
      passwordMessRef.current.innerText = "Trường này không được bỏ trống";
      isCheck = false;
    }

    if (isCheck) {
      usernameMessRef.current.innerText = "";
      passwordMessRef.current.innerText = "";
      console.log("login");
      const user = await login(loginInput);

      if (user) {
        navigate(-1);
      }
    }
  }

  return (
    <div className="login__container">
      <div className="container bg-white pb-5">
        <div className="row d-flex justify-content-start align-items-center mt-sm-5">
          <div className="col-lg-5 col-10">
            <div className=" d-none d-lg-block">
              {" "}
              <img src={login_img} alt="" />{" "}
            </div>
          </div>
          <div className="col-lg-4 offset-lg-2 col-md-6 offset-md-3">
            <div className="mt-3 mt-md-5">
              <h5 className="login__heading">ĐĂNG NHẬP</h5>
              <div className="pt-4">
                <div className="d-flex flex-column pb-3">
                  <label htmlFor="username">Tài khoản</label>
                  <input
                    value={username}
                    onChange={handleOnChangeInput}
                    type="username"
                    name="username"
                    id="username"
                    className="border-bottom border-primary pt-2"
                  />
                  <p className="input__message" ref={usernameMessRef}></p>
                </div>

                <div className="d-flex flex-column pb-3">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    value={password}
                    onChange={handleOnChangeInput}
                    type="password"
                    name="password"
                    id="password"
                    className="border-bottom border-primary pt-2"
                  />
                  <p className="input__message" ref={passwordMessRef}></p>
                </div>

                <div className="d-flex jusity-content-end pb-4">
                  <div className="ml-auto">
                    <a href="#" className="text-danger text-decoration-none">
                      Quên mật khẩu?
                    </a>
                  </div>
                </div>
                <div className="login__btn" onClick={handleOnSubmit}>
                  Đăng nhập
                </div>
                <div className="register mt-5">
                  <p>
                    Bạn chưa có tài khoản?{" "}
                    <Link to="/register">Tạo mới tài khoản</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
