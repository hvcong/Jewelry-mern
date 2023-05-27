import "../AdminProducts/AdminProducts.scss";
import { useState, useEffect } from "react";
import Modal from "../../../components/admin/Modal";
import FormAddProduct from "../../../components/admin/FormAddProduct";
import FormEditProduct from "../../../components/admin/FormEditProduct";
import { useAdminContext } from "../../../store/contexts/AdminContext";
import { setProducts } from "../../../store/actions/productAction";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";
import FormOrder from "../../../components/admin/FormOrder";
import { parsePriceToString } from "../../../utils";
import orderApi from "../../../api/orderApi";
import { toast } from "react-toastify";
import productApi from "../../../api/productApi";

function AdminInvoices() {
  const { setNavItem } = useAdminContext();
  const { orders, setIsSpinnerLoading, loadAllData } = useGlobalContext();

  const [modalState, setModalState] = useState({
    visible: false,
    type: "",
    itemSelected: null,
  });

  useEffect(() => {
    setNavItem("invoices");
  }, []);

  async function handleUpdateState(order, newState) {
    setIsSpinnerLoading(true);
    let { orderDetails, ..._order } = order;
    let res = await orderApi.updateById({
      ..._order,
      account: { id: order.account.id },
      state: newState,
    });

    if (res.success) {
      if (newState == "cancel") {
        for (const orderDetail of orderDetails) {
          await orderApi.updateProduct({
            ...orderDetail.product,
            quantity: orderDetail.quantity + orderDetail.product.quantity,
          });
        }
      }

      await loadAllData();
      setIsSpinnerLoading(false);
      toast.success("Cập nhật thành công!");
    } else {
      setIsSpinnerLoading(false);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  }
  return (
    <div>
      <div className="admin__product">
        <div className="content__heading">Dánh sách đơn hàng</div>

        <table className="table table-sm">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Mã ĐH</th>
              <th scope="col">Mã KH</th>
              <th scope="col">Thời gian đặt</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Trạng thái</th>

              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.length > 0 &&
              orders.map((item, index) => {
                const { id, account, state, orderDate, cost } = item;
                return (
                  <tr key={id} className="product__item">
                    <td>{id}</td>
                    <td>{account.id}</td>
                    <td>{orderDate}</td>
                    <td>{parsePriceToString(cost)}</td>
                    <td className="order__state">
                      <div className={`order__state_${state}`}>
                        {(state == "oke" && "Thành công") ||
                          (state == "cancel" && "Đã hủy") ||
                          (state == "pendding" && "Đang chờ xử lí")}
                      </div>
                    </td>
                    <td className="more-btn">
                      <span class="material-icons">more_vert</span>
                      <div className="more-btn-list">
                        {state == "pendding" && (
                          <>
                            <div
                              className="more-btn-item more-btn-item-accept"
                              onClick={() => {
                                handleUpdateState(item, "oke");
                              }}
                            >
                              <span>Xác nhận</span>
                            </div>
                            <div
                              className="more-btn-item more-btn-item-delete"
                              onClick={() => {
                                handleUpdateState(item, "cancel");
                              }}
                            >
                              <span>Hủy</span>
                            </div>
                            <div
                              className="more-btn-item more-btn-item-edit"
                              onClick={() => {
                                setModalState({
                                  visible: true,
                                  type: "update",
                                  itemSelected: item,
                                });
                              }}
                            >
                              <span>Chỉnh sửa</span>
                            </div>
                          </>
                        )}

                        <div
                          className="more-btn-item more-btn-item-view "
                          onClick={() => {
                            setModalState({
                              visible: true,
                              type: "view",
                              itemSelected: item,
                            });
                          }}
                        >
                          <span>Chi tiết</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {modalState.visible && (
        <Modal
          setIsOpen={() => {
            setModalState({
              visible: false,
            });
          }}
        >
          <FormOrder
            setIsOpen={() =>
              setModalState({
                visible: false,
              })
            }
            setModalState={setModalState}
            modalState={modalState}
          />
        </Modal>
      )}
    </div>
  );
}

export default AdminInvoices;
