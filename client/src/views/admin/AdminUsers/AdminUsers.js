import "../AdminProducts/AdminProducts.scss";
import { useState, useEffect } from "react";
import Modal from "../../../components/admin/Modal";
import FormAddProduct from "../../../components/admin/FormAddProduct";
import FormEditProduct from "../../../components/admin/FormEditProduct";
import { useAdminContext } from "../../../store/contexts/AdminContext";
import { setProducts } from "../../../store/actions/productAction";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";
import FormUser from "../../../components/admin/FormUser";

function AdminUsers() {
  const { setNavItem } = useAdminContext();
  const { users } = useGlobalContext();

  const [modalState, setModalState] = useState({
    visible: false,
    type: "",
    itemSelected: null,
  });

  useEffect(() => {
    setNavItem("users");
  }, []);

  return (
    <div>
      <div className="admin__product">
        <div className="content__heading">
          Danh sách khách hàng
          <div
            className="admin__product-btn-add"
            onClick={() => {
              setModalState({
                visible: true,
                type: "create",
              });
            }}
          >
            <span class="material-icons">post_add</span>
            Thêm mới
          </div>
        </div>

        <table className="table table-sm">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Tên KH</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((item, index) => {
                const { email, name, phonenumber, address } = item;
                return (
                  <tr key={email} className="product__item">
                    <td>{email}</td>
                    <td>{name}</td>
                    <td>{phonenumber}</td>
                    <td>{address}</td>
                    <td className="more-btn">
                      <span class="material-icons">more_vert</span>
                      <div className="more-btn-list">
                        <div
                          className="more-btn-item more-btn-item-edit "
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
                        <div
                          className="more-btn-item more-btn-item-delete "
                          onClick={() => {}}
                        >
                          <span>Xóa</span>
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
          <FormUser
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

export default AdminUsers;
