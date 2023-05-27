import "./FormAddProduct.scss";
import { useState, useRef, useEffect } from "react";
import { isVietnamesePhoneNumberValid } from "./../../views/PaymentPage/PaymentPage";
import authApi from "../../api/authApi";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import { toast } from "react-toastify";

function FormUser({ setIsOpen, modalState, setModalState }) {
  const formMessageRef = useRef();
  const [errMessage, setErrMessage] = useState({
    email: "",
    phoneNumber: "",
    address: "",
    name: "",
  });

  const [stateForm, setStateForm] = useState({
    email: "",
    phoneNumber: "",
    address: "",
    name: "",
  });

  const { loadAllData, setIsSpinnerLoading } = useGlobalContext();

  useEffect(() => {
    if (modalState.itemSelected) {
      setStateForm({
        ...modalState.itemSelected,
      });
    }
    return () => {};
  }, [modalState]);

  const { id, name, phoneNumber, email, address } = stateForm;

  function handleOnChange(e) {
    setStateForm({
      ...stateForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    let _errMess = {};

    let isCheck = true;

    if (!stateForm.name) {
      _errMess.name = "Không được bỏ trống!";
      isCheck = false;
    } else if (!stateForm.name.trim()) {
      _errMess.name = "Không được bỏ trống!";
      isCheck = false;
    }

    if (!stateForm.phoneNumber) {
      _errMess.phoneNumber = "Không được bỏ trống!";
      isCheck = false;
    } else if (!stateForm.phoneNumber.trim()) {
      _errMess.phoneNumber = "Không được bỏ trống!";
      isCheck = false;
    } else {
      if (!isVietnamesePhoneNumberValid(stateForm.phoneNumber)) {
        _errMess.phoneNumber = "Không hợp lệ!";
        isCheck = false;
      }
    }

    if (isCheck) {
      setIsSpinnerLoading(true);
      let res = await authApi.updateUser({
        id: stateForm.id,
        email: stateForm.email,
        name: stateForm.name,
        address: stateForm.address,
        phoneNumber: stateForm.phoneNumber,
      });

      if (res.success) {
        await loadAllData();
        setIsSpinnerLoading(false);
        toast.info("Cập nhật thông tin thành công");
      } else {
        setIsSpinnerLoading(false);
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
      }
    }
  }

  return (
    <div className="modal__create-products">
      <div className="modal__heading">
        <h1 className="modal__title">
          {modalState.type == "create" && "Thêm mới khách hàng"}
          {modalState.type == "update" && "Cập nhật thông tin khách hàng"}
          {modalState.type == "view" && "Xem thông tin khách hàng"}
        </h1>
        <p ref={formMessageRef} className="modal__form-massage"></p>
      </div>

      <div className="modal__body">
        <form className="form__create-product p-4">
          <div className="row">
            <div className="form-group col-12">
              <label htmlFor="price">Mã KH</label>
              <input
                name="id"
                value={id}
                onChange={handleOnChange}
                className="form-control"
                id="id"
                readOnly
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="price">Email</label>
              <input
                name="email"
                value={email}
                onChange={handleOnChange}
                className="form-control"
                id="email"
                placeholder="Email..."
                readOnly={
                  modalState.type == "view" || modalState.type == "update"
                }
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="sale">Họ và tên</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleOnChange}
                className="form-control"
                id="name"
                placeholder="Họ và tên..."
                readOnly={modalState.type == "view"}
              />
              <div className="message">{errMessage.phoneNumber}</div>
            </div>
            <div className="form-group col-12">
              <label htmlFor="sale">Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleOnChange}
                className="form-control"
                id="phoneNumber"
                placeholder="Số điện thoại..."
                readOnly={modalState.type == "view"}
              />
              <div className="message">{errMessage.phoneNumber}</div>
            </div>

            <div className="form-group col-12">
              <label htmlFor="address">Địa chỉ</label>
              <textarea
                rows="2"
                name="address"
                value={address}
                onChange={handleOnChange}
                className="form-control"
                id="address"
                readOnly={modalState.type == "view"}
                placeholder="Địa chỉ..."
              />
              <div className="message">{errMessage.address}</div>
            </div>

            {modalState.type != "view" ? (
              <div className="form-group col-12 ">
                <div className="form__btn-group">
                  <span
                    className="btn btn-danger"
                    onClick={() => setIsOpen(false)}
                  >
                    Hủy
                  </span>
                  <button
                    type="submit"
                    className="btn btn-primary ml-3"
                    onClick={handleOnSubmit}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            ) : (
              <div className="form-group col-12 ">
                <div className="form__btn-group">
                  <span
                    className="btn btn-primary ml-3"
                    onClick={() =>
                      setModalState({
                        ...modalState,
                        type: "update",
                      })
                    }
                  >
                    Chỉnh sửa
                  </span>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormUser;
