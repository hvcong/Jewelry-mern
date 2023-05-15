import "./FormAddProduct.scss";
import { useState, useRef, useEffect } from "react";

function FormUser({ setIsOpen, modalState, setModalState }) {
  const formMessageRef = useRef();

  const [stateForm, setStateForm] = useState({
    email: "",
    phonenumber: "",
    address: "",
    name: "",
  });

  useEffect(() => {
    if (modalState.itemSelected) {
      setStateForm({
        ...modalState.itemSelected,
      });
    }
    return () => {};
  }, [modalState]);

  const { name, phonenumber, email, address } = stateForm;

  function handleOnChange(e) {
    setStateForm({
      ...stateForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
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
            </div>
            <div className="form-group col-12">
              <label htmlFor="sale">Số điện thoại</label>
              <input
                type="text"
                name="phonenumber"
                value={phonenumber}
                onChange={handleOnChange}
                className="form-control"
                id="phonenumber"
                placeholder="Số điện thoại..."
                readOnly={modalState.type == "view"}
              />
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
