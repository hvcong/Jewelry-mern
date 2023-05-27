import "./FormAddProduct.scss";
import { useState, useRef, useEffect } from "react";
import { parsePriceToString } from "./../../utils/index";
import QuantityProduct from "../QuantityProduct/QuantityProduct";
import { isVietnamesePhoneNumberValid } from "../../views/PaymentPage/PaymentPage";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import orderApi from "../../api/orderApi";
import { toast } from "react-toastify";

function FormOrder({ setIsOpen, modalState, setModalState }) {
  const formMessageRef = useRef();

  const { setIsSpinnerLoading, loadAllData } = useGlobalContext();

  const [stateForm, setStateForm] = useState({
    id: 2,
    phoneNumber: "0823432121",
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
      phoneNumber: "0864234234",
      role: "kh",
    },
  });

  const [errMessage, setErrMessage] = useState({});

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

    let _errMess = {};

    let isCheck = true;

    if (!stateForm.address) {
      _errMess.address = "Không được bỏ trống!";
      isCheck = false;
    } else if (!stateForm.address.trim()) {
      _errMess.address = "Không được bỏ trống!";
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

    setErrMessage(_errMess);
    if (isCheck) {
      setIsSpinnerLoading(true);

      let { orderDetails, ..._order } = stateForm;

      let res = await orderApi.updateById({
        ..._order,
        account: { id: stateForm.account.id },
      });

      if (res.success) {
        await loadAllData();
        setIsSpinnerLoading(false);
        toast.success("Cập nhật thành công!");
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
                value={stateForm.phoneNumber}
                onChange={handleOnChange}
                name="phoneNumber"
                className="form-control"
                readOnly={modalState.type == "view"}
              />
              <div className="message">{errMessage.phoneNumber}</div>
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="price">Địa chỉ nhận hàng</label>
              <input
                value={stateForm.address}
                onChange={handleOnChange}
                name="address"
                className="form-control"
                readOnly={modalState.type == "view"}
              />
              <div className="message">{errMessage.address}</div>
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
                            {/* <td>
                              {stateForm.state == "pendding" &&
                                modalState.type == "update" && (
                                  <div
                                    className="btn_delete"
                                    onClick={() => {
                                      let _orderDetails = [
                                        ...stateForm.orderDetails,
                                      ];

                                      _orderDetails = _orderDetails.filter(
                                        (orderDetail) => {
                                          return orderDetail.id != item.id;
                                        }
                                      );

                                      setStateForm({
                                        ...stateForm,
                                        orderDetails: _orderDetails,
                                      });
                                    }}
                                  >
                                    <span class="material-icons">
                                      delete_forever
                                    </span>
                                  </div>
                                )}
                            </td> */}
                            <td className="text-center">{item.product.id}</td>
                            <td className="text-right">
                              {parsePriceToString(item.price)}
                            </td>
                            <td className="text-right">{item.sale}%</td>
                            <td className="text-right">{item.quantity}</td>
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
