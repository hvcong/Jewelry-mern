import "./AdminNav.scss";

import { Link } from "react-router-dom";
import adminLogo from "../../../assets/images/admin_logo.png";
import { useState } from "react";
import { useAdminContext } from "../../../store/contexts/AdminContext";

function AdminNav({ setIsOpenNav }) {
  const { navItem, setNavItem } = useAdminContext();

  return (
    <div className="admin__nav-container">
      <div className="logo">
        <img src={adminLogo} />
      </div>
      <div className="nav__body">
        <ul class="nav__body-list">
          <li
            className="nav__body-item"
            onClick={() => {
              setIsOpenNav(false);
              setNavItem("products");
            }}
          >
            <Link
              to="/admin/products"
              className={
                navItem === "products"
                  ? "nav__body-link active"
                  : "nav__body-link"
              }
            >
              Sản phẩm
            </Link>
          </li>
          <li
            className="nav__body-item"
            onClick={() => {
              setIsOpenNav(false);
              setNavItem("category");
            }}
          >
            <Link
              to="/admin/category"
              className={
                navItem === "category"
                  ? "nav__body-link active"
                  : "nav__body-link"
              }
            >
              Nhóm sản phẩm
            </Link>
          </li>

          <li
            className="nav__body-item"
            onClick={() => {
              setIsOpenNav(false);
              setNavItem("users");
            }}
          >
            <Link
              to="/admin/users"
              className={
                navItem === "users" ? "nav__body-link active" : "nav__body-link"
              }
            >
              Khách hàng
            </Link>
          </li>
          <li
            className="nav__body-item"
            onClick={() => {
              setIsOpenNav(false);
              setNavItem("invoices");
            }}
          >
            <Link
              to="/admin/invoices"
              className={
                navItem === "invoices"
                  ? "nav__body-link active"
                  : "nav__body-link"
              }
            >
              Đơn hàng
            </Link>
          </li>
          <li
            className="nav__body-item"
            onClick={() => {
              setIsOpenNav(false);
              setNavItem("statistical");
            }}
          ></li>
        </ul>
      </div>
    </div>
  );
}

export default AdminNav;
