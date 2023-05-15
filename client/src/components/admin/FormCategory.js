import "./FormAddProduct.scss";
import { useState, useRef, useEffect } from "react";

function FormCategory({ setIsOpen, modalState, setModalState }) {
  const formMessageRef = useRef();

  const [stateForm, setStateForm] = useState({
    id: "",
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

  const { id, name } = stateForm;

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
          {modalState.type == "create" && "Thêm mới nhóm sản phẩm"}
          {modalState.type == "update" && "Cập nhật thông tin nhóm sản phẩm"}
          {modalState.type == "view" && "Xem thông tin nhóm sản phẩm"}
        </h1>
        <p ref={formMessageRef} className="modal__form-massage"></p>
      </div>

      <div className="modal__body">
        <form className="form__create-product p-4">
          <div className="row">
            {modalState.type != "create" && (
              <div className="form-group col-12">
                <label htmlFor="sale">Mã nhóm SP</label>
                <input
                  type="text"
                  name="id"
                  value={id}
                  onChange={handleOnChange}
                  className="form-control"
                  id="id"
                  placeholder="Mã..."
                  readOnly
                />
              </div>
            )}
            <div className="form-group col-12">
              <label htmlFor="sale">Tên nhóm SP</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleOnChange}
                className="form-control"
                id="name"
                placeholder="Tên nhóm SP..."
                readOnly={modalState.type == "view"}
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

export default FormCategory;
