import "./FormAddProduct.scss";
import { useState, useRef, useEffect } from "react";
import { parsePriceToString } from "./../../utils/index";
import QuantityProduct from "../QuantityProduct/QuantityProduct";

function FormOrder({ setIsOpen, modalState, setModalState }) {
  const formMessageRef = useRef();

  const [stateForm, setStateForm] = useState({
    id: 2,
    phonenumber: "0823432121",
    address: "2/3/4 duong 15",
    orderDate: new Date().toDateString(),
    state: "oke",
    cost: 10000,
    orderDetails: [
      {
        id: 322,
        quantity: 5,
        price: 10000,
        sale: 10,
        product: {
          description:
            "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
          imageUrl:
            "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
          name: "Coca cola ",
          price: 10000,
          quantity: 10,
          sale: 10,
          id: 221,
        },
      },
      {
        id: 4,
        quantity: 5,
        price: 10000,
        sale: 0,
        product: {
          description:
            "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
          imageUrl:
            "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
          name: "Coca cola 2 ",
          price: 10000,
          quantity: 10,
          sale: 0,
          id: 229,
        },
      },
    ],
    account: {
      email: "dfsdfds@gmail.com",
      name: "Hoàng Văn Công",
      address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
      phonenumber: "0864234234",
      role: "kh",
    },
  });

  useEffect(() => {
    if (modalState.itemSelected) {
      setStateForm({
        ...modalState.itemSelected,
      });
    }
    return () => {};
  }, [modalState]);

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
          {modalState.type == "update" && "Cập nhật thông tin đơn hàng"}
          {modalState.type == "view" && "Xem thông tin đơn hàng"}
        </h1>
        <p ref={formMessageRef} className="modal__form-massage"></p>
      </div>

      <div className="modal__body">
        <form className="form__create-product p-4">
          <div className="row">
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="price">Mã đơn hàng</label>
              <input
                value={stateForm.id}
                disabled
                onChange={handleOnChange}
                className="form-control"
                placeholder="Mã đơn hàng..."
                readOnly={modalState.type == "view"}
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="price">Tổng tiền</label>
              <input
                value={stateForm.cost}
                disabled
                onChange={handleOnChange}
                className="form-control"
                readOnly={modalState.type == "view"}
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="price">Thời gian đặt</label>
              <input
                value={stateForm.orderDate}
                disabled
                onChange={handleOnChange}
                className="form-control"
                readOnly={modalState.type == "view"}
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="price">Số điện thoại nhận hàng</label>
              <input
                value={stateForm.phonenumber}
                disabled
                onChange={handleOnChange}
                className="form-control"
                readOnly={modalState.type == "view"}
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="price">Địa chỉ nhận hàng</label>
              <input
                value={stateForm.address}
                onChange={handleOnChange}
                className="form-control"
                readOnly={modalState.type == "view"}
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="price">Trạng thái</label>
              <div
                className="order__state"
                style={{
                  marginTop: 12,
                }}
              >
                <span className={`order__state_${stateForm.state}`}>
                  {(stateForm.state == "oke" && "Thành công") ||
                    (stateForm.state == "cancel" && "Đã hủy") ||
                    (stateForm.state == "pendding" && "Đang chờ xử lí")}
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="list__products">
                <div className="list__products_title">Danh sách sản phẩm</div>
                <table className="table table-sm">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" className="text-center"></th>
                      <th scope="col" className="text-center">
                        Mã SP
                      </th>
                      <th scope="col" className="text-center">
                        Đơn giá
                      </th>
                      <th scope="col" className="text-center">
                        Giảm giá(%)
                      </th>
                      <th scope="col" className="text-center">
                        Số lượng
                      </th>
                      <th scope="col" className="text-center">
                        Tổng tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stateForm.orderDetails &&
                      stateForm.orderDetails.length > 0 &&
                      stateForm.orderDetails.map((item, index) => {
                        return (
                          <tr key={item.id} className="product__item">
                            <td>
                              {stateForm.state == "pendding" &&
                                modalState.type == "update" && (
                                  <div
                                    className="btn_delete"
                                    onClick={() => {}}
                                  >
                                    <span class="material-icons">
                                      delete_forever
                                    </span>
                                  </div>
                                )}
                            </td>
                            <td className="text-center">{item.product.id}</td>
                            <td className="text-right">
                              {parsePriceToString(item.price)}
                            </td>
                            <td className="text-right">{item.sale}%</td>
                            <td className="text-right">
                              {modalState.type == "view" ? (
                                item.quantity
                              ) : (
                                <QuantityProduct
                                  quantity={item.quantity}
                                  setQuantity={(number) => {
                                    let _orderDetails = [
                                      ...stateForm.orderDetails,
                                    ];
                                    _orderDetails = _orderDetails.map(
                                      (_item) => {
                                        if (_item.id == item.id) {
                                          return {
                                            ..._item,
                                            quantity: number,
                                          };
                                        }
                                        return _item;
                                      }
                                    );

                                    _orderDetails = _orderDetails.filter(
                                      (_item) => _item.quantity > 0
                                    );

                                    setStateForm({
                                      ...stateForm,
                                      orderDetails: _orderDetails,
                                    });
                                  }}
                                />
                              )}
                            </td>
                            <td className="text-right">
                              <div style={{ width: 100 }}>
                                {parsePriceToString(
                                  (item.quantity *
                                    item.price *
                                    (100 - (item.sale || 0))) /
                                    100
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* <div className="form-group col-12">
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
            </div> */}

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
                  {stateForm.state == "pendding" && (
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
                  )}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormOrder;
