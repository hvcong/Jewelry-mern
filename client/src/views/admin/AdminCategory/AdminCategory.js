import "../AdminProducts/AdminProducts.scss";
import { useState, useEffect } from "react";
import Modal from "../../../components/admin/Modal";
import { useAdminContext } from "../../../store/contexts/AdminContext";
import { setProducts } from "../../../store/actions/productAction";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";
import FormCategory from "../../../components/admin/FormCategory";

function AdminCategory() {
  const { setNavItem } = useAdminContext();

  const { categories } = useGlobalContext();

  const [modalState, setModalState] = useState({
    visible: false,
    type: "",
    itemSelected: null,
  });

  useEffect(() => {
    setNavItem("category");
  }, []);

  async function handleDeleteProduct(id) {}

  return (
    <div>
      <div className="admin__product">
        <div className="content__heading">
          Danh sách nhóm sản phẩm
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
              <th scope="col">Mã nhóm SP</th>
              <th scope="col">Tên nhóm SP</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.length > 0 &&
              categories.map((item, index) => {
                const { id, name } = item;
                return (
                  <tr key={id} className="product__item">
                    <td>{id}</td>
                    <td>{name}</td>
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
          <FormCategory
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

export default AdminCategory;
