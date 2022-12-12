import "./App.css";
import { Outlet } from "react-router";
import { useState } from "react";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import MenuModal from "../components/MenuModal/MenuModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import { useGlobalContext } from "../store/contexts/GlobalContext";
import { api } from "../store/constants";

function App() {
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);
  const { isLoading } = useGlobalContext();
  console.log(api);

  return (
    <div className="app-container container-fruid">
      <Header
        isOpenMenuModal={isOpenMenuModal}
        setIsOpenMenuModal={setIsOpenMenuModal}
      />
      <div className="app-body">
        <MenuModal
          isOpenMenuModal={isOpenMenuModal}
          setIsOpenMenuModal={setIsOpenMenuModal}
        />
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
        <Outlet />
        <Spinner isLoading={isLoading} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
