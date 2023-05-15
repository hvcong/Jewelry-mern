import { Link } from "react-router-dom";
import "./AdminHeader.scss";

function AdminHeader({ setIsOpenNav }) {
  return (
    <div className="admin__header-container">
      <div className="header__left">
        <div
          className="header__left-item d-block d-lg-none"
          onClick={() => setIsOpenNav(true)}
        >
          <span class="material-icons header__icon">menu</span>
        </div>
      </div>
      <div className="header__right">
        <Link to="/" className="header__right-link">
          <span class="material-icons header__icon">exit_to_app</span>
        </Link>
      </div>
    </div>
  );
}

export default AdminHeader;
