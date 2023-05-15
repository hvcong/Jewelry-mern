import "./Header.scss";
import { Link } from "react-router-dom";
import { useCartContext } from "../../../store/contexts/CartContext";

import header_logo from "../../../assets/images/header_logo.png";
import { useAuthContext } from "../../../store/contexts/AuthContext";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";

function Header({ setIsOpenMenuModal }) {
  // new
  const { account, logOut, cart } = useGlobalContext();
  let isAuthenticated = account?.isLogin;

  return (
    <div className="sticky">
      <div className="header__wrap">
        <div className="container header__container">
          <div
            className="header__menu-icon d-md-none"
            onClick={() => {
              setIsOpenMenuModal(true);
            }}
          >
            <span className="material-icons">menu</span>
          </div>

          <div className="header__nav d-none d-md-block">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link to="/" className="header__nav-link">
                  Trang Chủ
                </Link>
              </li>
              <li className="header__nav-item">
                <Link to="/" className="header__nav-link">
                  Giới thiệu
                </Link>
              </li>
              <li className="header__nav-item">
                <Link to="/" className="header__nav-link">
                  Liên hệ
                </Link>
              </li>

              <li className="header__nav-item">
                <Link to="/products/category/all" className="header__nav-link">
                  Sản phẩm
                </Link>
              </li>
              <li className="header__nav-item account">
                <Link to="#" className="header__nav-link">
                  <span className="material-icons">person</span>
                </Link>
                <div className="account__box arrow-top">
                  {isAuthenticated ? (
                    <>
                      <Link to="/profile" className="account__box-item">
                        <span className="material-icons">person</span>
                        Thông tin của tôi
                      </Link>

                      {account && account.role === "ad" && (
                        <Link
                          to="/admin/products"
                          className="account__box-item"
                        >
                          <span class="material-icons">manage_accounts</span>
                          Trang quản trị viên
                        </Link>
                      )}
                      <a
                        href="#"
                        onClick={logOut}
                        className="account__box-item"
                      >
                        <span class="material-icons">logout</span>
                        Đăng xuất
                      </a>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="account__box-item">
                        <span class="material-icons">login</span>
                        Đăng nhập
                      </Link>
                      <Link to="/register" className="account__box-item">
                        <span class="material-icons">person_add</span>
                        Đăng kí
                      </Link>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>

          <div className="header__cart-wrap">
            <Link to="/cart" className="header__cart">
              <span className="header__cart-icon"></span>
              <span className="header__cart-container">
                {cart?.items.length || 0}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
