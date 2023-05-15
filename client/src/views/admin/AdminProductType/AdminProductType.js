import { useState, useEffect } from "react";
import Modal from "../../../components/admin/Modal";
import FormAddProduct from "../../../components/admin/FormAddProduct";
import FormEditProduct from "../../../components/admin/FormEditProduct";
import { useAdminContext } from "../../../store/contexts/AdminContext";
import { setProducts } from "../../../store/actions/productAction";

function AdminProductType() {
  const { setNavItem, products } = useAdminContext();

  const [isOpenCreateProductModal, setIsOpenCreateProductModal] =
    useState(false);
  const [isOpenEditProductModal, setIsOpenEditProductModal] = useState(false);
  const [productEdit, setProductEdit] = useState({});

  useEffect(() => {
    setNavItem("product_types");
  }, []);

  // function

  async function handleCreateProduct(product) {}

  async function handleDeleteProduct(_id) {}

  async function handleUpdateProduct(product) {}

  function handleOnClickOpenFormEdit(product) {
    setProductEdit(product);
    setIsOpenEditProductModal(true);
  }

  return (
    <div>
      <div className="admin__product">
        <div className="content__heading">
          Nhóm sản phẩm
          <div
            className="admin__product-btn-add"
            onClick={() => {
              setIsOpenCreateProductModal(true);
            }}
          >
            <span class="material-icons">post_add</span>
            Thêm mới
          </div>
        </div>

        <table className="table table-sm">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Mã</th>
              <th scope="col">Tên</th>

              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products.map((product, index) => {
                const { _id, title, price, quantity, sale, sold } = product;
                return (
                  <tr key={_id} className="product__item">
                    <td>{title}</td>

                    <td className="more-btn">
                      <span class="material-icons">more_vert</span>
                      <div className="more-btn-list">
                        <div
                          className="more-btn-item"
                          onClick={() => {
                            handleOnClickOpenFormEdit(product);
                          }}
                        >
                          <span class="material-icons">
                            drive_file_rename_outline
                          </span>
                          <span>Chỉnh sửa</span>
                        </div>
                        <div
                          className="more-btn-item"
                          onClick={() => handleDeleteProduct(_id)}
                        >
                          <span class="material-icons">delete_forever</span>
                          <span>Xóa</span>
                        </div>
                        <div className="more-btn-item">
                          <span class="material-icons">feed</span>
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

      {isOpenCreateProductModal ? (
        <Modal setIsOpen={setIsOpenCreateProductModal}>
          <FormAddProduct
            setIsOpen={setIsOpenCreateProductModal}
            handleCreateProduct={handleCreateProduct}
          />
        </Modal>
      ) : (
        ""
      )}

      {isOpenEditProductModal ? (
        <Modal setIsOpen={setIsOpenEditProductModal}>
          <FormEditProduct
            setIsOpen={setIsOpenEditProductModal}
            handleUpdateProduct={handleUpdateProduct}
            productEdit={productEdit}
          />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminProductType;
