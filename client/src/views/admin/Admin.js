import "./Admin.scss";
import { useState, useContext, useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import logoFooter from "../../assets/images/logo_footer.png";
import AdminNav from "./AdminNav/AdminNav";
import AdminHeader from "./AdminHeader/AdminHeader";
import { useAdminContext } from "../../store/contexts/AdminContext";
import { useAuthContext } from "../../store/contexts/AuthContext";
import Modal from "../../components/layout/Modal/Modal";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import Spinner from "../../components/Spinner";
import { ToastContainer } from "react-toastify";

function Admin() {
  const { account, isLoading } = useGlobalContext();
  const [route, setRoute] = useState("");
  const [isOpenNav, setIsOpenNav] = useState(false);

  if (account && account.role != "ad") {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin__container container-fruid">
      <div className="row no-gutters">
        <div className="col-lg-2 d-none d-lg-block">
          <AdminNav
            route={route}
            setRoute={setRoute}
            setIsOpenNav={setIsOpenNav}
          />
        </div>
        <div className="col-12 col-lg-10">
          <div className="row">
            <div className="col-12">
              <AdminHeader setIsOpenNav={setIsOpenNav} />
            </div>
            <div className="col-12">
              <Outlet />
              <Spinner isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      {isOpenNav ? (
        <Modal setIsOpen={setIsOpenNav}>
          <AdminNav
            setIsOpenNav={setIsOpenNav}
            route={route}
            setRoute={setRoute}
          />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default Admin;
