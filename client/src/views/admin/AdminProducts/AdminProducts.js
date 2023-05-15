import "./AdminProducts.scss";
import { useState, useEffect } from "react";
import Modal from "../../../components/admin/Modal";
import FormAddProduct from "../../../components/admin/FormAddProduct";
import FormEditProduct from "../../../components/admin/FormEditProduct";
import { useAdminContext } from "../../../store/contexts/AdminContext";
import { setProducts } from "../../../store/actions/productAction";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";

function AdminProducts() {
  const { setNavItem } = useAdminContext();

  const { products } = useGlobalContext();

  const [modalState, setModalState] = useState({
    visible: false,
    type: "",
    itemSelected: null,
  });

  useEffect(() => {
    setNavItem("products");
  }, []);

  async function handleDeleteProduct(id) {}

  return (
    <div>
      <div className="admin__product">
        <div className="content__heading">
          Tất cả sản phẩm
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
              <th scope="col">Mã SP</th>
              <th scope="col">Tên SP</th>
              <th scope="col">Giá</th>
              <th scope="col">Giảm giá</th>
              <th scope="col">Tồn kho</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products.map((item, index) => {
                const { id, name, price, quantity, sale } = item;
                return (
                  <tr key={id} className="product__item">
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>{sale}</td>
                    <td>{quantity}</td>
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
          <FormAddProduct
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

export default AdminProducts;
