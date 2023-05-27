import { toast } from "react-toastify";
import orderApi from "../../api/orderApi";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import "./FormAddProduct.scss";
import { useState, useRef, useEffect } from "react";

function FormAddProduct({ setIsOpen, modalState, setModalState }) {
  const formMessageRef = useRef();
  const { categories, setIsSpinnerLoading, loadAllData } = useGlobalContext();

  const [stateForm, setStateForm] = useState({
    name: "",
    description: "",
    imageUri: "",
    price: 0,
    sale: 0,
    quantity: 0,
    category: "",
  });

  const [errMessage, setErrMessage] = useState({
    name: "",
    description: "",
    imageUri: "",
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

  const { name, description, imageUri, price, sale, quantity, category, id } =
    stateForm;

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

    if (!stateForm.imageUri) {
      _errMess.imageUri = "Không được bỏ trống!";
      isCheck = false;
    } else if (!stateForm.imageUri.trim()) {
      _errMess.imageUri = "Không được bỏ trống!";
      isCheck = false;
    }

    if (!stateForm.price) {
      _errMess.price = "Không được bỏ trống!";
      isCheck = false;
    } else if (stateForm.price < 0) {
      _errMess.price = "Giá phải >= 0";
      isCheck = false;
    }

    if (stateForm.sale == "") {
    } else if (stateForm.sale < 0 || stateForm > 100) {
      _errMess.sale = "Giảm giá phải nằm trong khoảng từ 0 - 100";
      isCheck = false;
    }

    if (!stateForm.quantity) {
      _errMess.quantity = "Không được bỏ trống!";
      isCheck = false;
    } else if (stateForm.quantity < 0) {
      _errMess.quantity = "Số lượng phải >= 0";
      isCheck = false;
    }

    setErrMessage(_errMess);
    //simple validate
    if (isCheck) {
      setIsSpinnerLoading(true);

      if (modalState.type == "create") {
        let res = await orderApi.addProduct({
          name: stateForm.name,
          quantity: stateForm.quantity,
          imageUri: stateForm.imageUri,
          price: stateForm.price,
          sale: stateForm.sale,
          category: stateForm.category,
        });
        if (res) {
          await loadAllData();
          setIsSpinnerLoading(false);
          toast.success("Thêm sản phẩm thành công");
          setIsOpen(false);
        } else {
          setIsSpinnerLoading(false);
        }
      }

      if (modalState.type == "update") {
        let res = await orderApi.updateProduct({
          id: stateForm.id,
          name: stateForm.name,
          quantity: stateForm.quantity,
          imageUri: stateForm.imageUri,
          price: stateForm.price,
          sale: stateForm.sale,
          category: stateForm.category,
        });
        if (res) {
          await loadAllData();
          setIsSpinnerLoading(false);
          toast.success("Cập nhật thông tin thành công");
          setIsOpen(false);
        } else {
          setIsSpinnerLoading(false);
        }
      }
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
              <label htmlFor="title">Mã sản phẩm</label>
              <input
                type="text"
                name="id"
                value={id}
                onChange={handleOnChange}
                className="form-control"
                id="id"
                readOnly
              />
            </div>
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
              <div className="message">{errMessage.name}</div>
            </div>
            {/* <div className="form-group col-12">
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
              <div className="message">{errMessage.description}</div>
            </div> */}

            <div className="form-group col-12 col-sm-6">
              <label htmlFor="imageUri">Hình ảnh</label>
              <input
                type="text"
                name="imageUri"
                value={imageUri}
                onChange={handleOnChange}
                className="form-control"
                id="imageUri"
                placeholder="https://..."
                readOnly={modalState.type == "view"}
              />
              <div className="message">{errMessage.imageUri}</div>
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
                min={0}
                placeholder="Giá..."
                readOnly={modalState.type == "view"}
              />
              <div className="message">{errMessage.price}</div>
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
                min={0}
                placeholder="Giảm giá..."
                readOnly={modalState.type == "view"}
              />
              <div className="message">{errMessage.sale}</div>
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
                min={0}
                placeholder="Số lượng..."
                readOnly={modalState.type == "view"}
              />
              <div className="message">{errMessage.quantity}</div>
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
                {modalState.type != "view" && (
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
