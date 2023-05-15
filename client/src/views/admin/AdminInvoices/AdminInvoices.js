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

function AdminInvoices() {
  const { setNavItem } = useAdminContext();
  const { orders } = useGlobalContext();

  const [modalState, setModalState] = useState({
    visible: false,
    type: "",
    itemSelected: null,
  });

  useEffect(() => {
    setNavItem("invoices");
  }, []);

  return (
    <div>
      <div className="admin__product">
        <div className="content__heading">Dánh sách đơn hàng</div>

        <table className="table table-sm">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Mã ĐH</th>
              <th scope="col">Email KH</th>
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
                    <td>{account.email}</td>
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
                              onClick={() => {}}
                            >
                              <span>Xác nhận</span>
                            </div>
                            <div
                              className="more-btn-item more-btn-item-delete"
                              onClick={() => {}}
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
