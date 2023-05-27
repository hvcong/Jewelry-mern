import "./RegisterPage.scss";

import login_img from "../../../assets/images/login_img.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuthContext } from "../../../store/contexts/AuthContext";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";
import { toast } from "react-toastify";

function RegisterPage() {
  const { register, account } = useGlobalContext();

  const [registerInput, setRegisterInput] = useState({
    username: "hvcong@gmail.com",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const usernameMessRef = useRef();
  const passwordMessRef = useRef();
  const confirmPasswordMessRef = useRef();
  const { username, password, confirmPassword } = registerInput;

  //function
  function handleOnChangeInput(e) {
    setRegisterInput({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "username") {
      usernameMessRef.current.innerText = "";
    }
    if (e.target.name === "password") {
      passwordMessRef.current.innerText = "";
    }
    if (e.target.name === "confirmPassword") {
      confirmPasswordMessRef.current.innerText = "";
    }
  }

  async function handleOnSubmit() {
    let isCheck = true;

    if (!username) {
      usernameMessRef.current.innerText = "Trường này không được bỏ trống";
      isCheck = false;
    } else {
      const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

      if (!validateEmail(username)) {
        usernameMessRef.current.innerText = "Email không hợp lệ!";
        isCheck = false;
      }
    }
    if (!password) {
      passwordMessRef.current.innerText = "Trường này không được bỏ trống";
      isCheck = false;
    }
    if (confirmPassword !== password) {
      confirmPasswordMessRef.current.innerText =
        "Hai mật khẩu không giống nhau";
      isCheck = false;
    }

    if (isCheck) {
      const result = await register({ email: username, password });
      if (result) {
        navigate("/");
      }
    }
  }

  return (
    <div className="register__container">
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
              <h5 className="register__heading">ĐĂNG KÍ</h5>
              <div className="pt-4">
                <div className="d-flex flex-column pb-3">
                  <label htmlFor="username">Tài khoản</label>
                  <input
                    onChange={handleOnChangeInput}
                    value={username}
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
                    onChange={handleOnChangeInput}
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    className="border-bottom border-primary pt-2"
                  />
                  <p className="input__message" ref={passwordMessRef}></p>
                </div>
                <div className="d-flex flex-column pb-3">
                  <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                  <input
                    onChange={handleOnChangeInput}
                    value={confirmPassword}
                    type="confirmPassword"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="border-bottom border-primary pt-2"
                  />
                  <p
                    className="input__message"
                    ref={confirmPasswordMessRef}
                  ></p>
                </div>

                <div className="register__btn" onClick={handleOnSubmit}>
                  Đăng kí
                </div>
                <div className="register mt-5">
                  <p>
                    Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
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

export default RegisterPage;
