import { useGlobalContext } from "../../store/contexts/GlobalContext";
import "./FormAddProduct.scss";
import { useState, useRef, useEffect } from "react";

function FormAddProduct({ setIsOpen, modalState, setModalState }) {
  const formMessageRef = useRef();
  const { categories } = useGlobalContext();

  const [stateForm, setStateForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    sale: "",
    quantity: "",
    category: "",
  });

  useEffect(() => {
    if (modalState.itemSelected) {
      setStateForm({
        ...modalState.itemSelected,
      });
    }
    return () => {};
  }, [modalState]);

  const { name, description, imageUrl, price, sale, quantity, category } =
    stateForm;

  function handleOnChange(e) {
    setStateForm({
      ...stateForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    //simple validate
    if (!name || !price || !imageUrl) {
      formMessageRef.current.innerText =
        "Vui lòng điền đầy đủ thông tin vào form!!";
    } else {
      // all good
      setIsOpen(false);
    }
  }

  return (
    <div className="modal__create-products">
      <div className="modal__heading">
        <h1 className="modal__title">
          {modalState.type == "create" && "Thêm mới sản phẩm"}
          {modalState.type == "update" && "Cập nhật thông tin sản phẩm"}
          {modalState.type == "view" && "Xem thông tin sản phẩm"}
        </h1>
        <p ref={formMessageRef} className="modal__form-massage"></p>
      </div>

      <div className="modal__body">
        <form className="form__create-product p-4">
          <div className="row">
            <div className="form-group col-12">
              <label htmlFor="title">Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleOnChange}
                className="form-control"
                id="name"
                readOnly={modalState.type == "view"}
                placeholder="Nhập tên sản phẩm..."
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="description">Mô tả</label>
              <textarea
                rows="4"
                name="description"
                value={description}
                onChange={handleOnChange}
                className="form-control"
                id="description"
                readOnly={modalState.type == "view"}
                placeholder="Mô tả sản phẩm..."
              />
            </div>

            <div className="form-group col-12 col-sm-6">
              <label htmlFor="imageUrl">Hình ảnh</label>
              <input
                type="text"
                name="imageUrl"
                value={imageUrl}
                onChange={handleOnChange}
                className="form-control"
                id="imageUrl"
                placeholder="https://..."
                readOnly={modalState.type == "view"}
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="price">Giá sản phẩm</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={handleOnChange}
                className="form-control"
                id="price"
                placeholder="Giá..."
                readOnly={modalState.type == "view"}
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="sale">Giảm giá</label>
              <input
                type="number"
                name="sale"
                value={sale}
                onChange={handleOnChange}
                className="form-control"
                id="sale"
                placeholder="Giảm giá..."
                readOnly={modalState.type == "view"}
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="quantity">Số lượng</label>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleOnChange}
                className="form-control"
                id="quantity"
                placeholder="Số lượng..."
                readOnly={modalState.type == "view"}
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="category">Nhóm sản phẩm</label>
              <select
                name="category"
                value={category}
                onChange={handleOnChange}
                id="category"
                className="form-control"
                disabled={modalState.type == "view"}
              >
                {(categories || []).map((item) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>

            <div className="form-group col-12 ">
              <div className="form__btn-group">
                {modalState.type == "update" && (
                  <>
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
                  </>
                )}

                {modalState.type == "view" && (
                  <span
                    className="btn btn-primary"
                    onClick={() =>
                      setModalState({
                        ...modalState,
                        type: "update",
                      })
                    }
                  >
                    Chỉnh sửa
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormAddProduct;
