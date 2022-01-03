import './AdminProducts.scss'
import { useState, useEffect } from 'react'
import Modal from '../../../components/admin/Modal'
import FormAddProduct from '../../../components/admin/FormAddProduct'
import FormEditProduct from '../../../components/admin/FormEditProduct'
import { useAdminContext } from '../../../store/contexts/AdminContext'
import { setProducts } from '../../../store/actions/productAction'

function AdminProducts() {

    const { navItem, setNavItem, products, updateProduct, deleteProduct, addProduct } = useAdminContext()

    const [isOpenCreateProductModal, setIsOpenCreateProductModal] = useState(false)
    const [isOpenEditProductModal, setIsOpenEditProductModal] = useState(false)
    const [productEdit, setProductEdit] = useState({})

    useEffect(() => {
        setNavItem('products')
    }, [])

    // function

    async function handleCreateProduct(product) {
        const response = await addProduct(product)
        if (response.success) {
            alert("create success")
        }
        else {
            alert('create not success')
        }
    }

    async function handleDeleteProduct(_id) {
        const response = await deleteProduct(_id)

        if (!response.success) {
            alert('Delete not success,' + response.message)
        }
    }

    async function handleUpdateProduct(product) {
        const response = await updateProduct(product)
        if (response.success) {
            alert("update success")
        }
        else {
            alert('update not success')
        }
    }

    function handleOnClickOpenFormEdit(product) {
        setProductEdit(product)
        setIsOpenEditProductModal(true)
    }

    return (
        <div>
            <div className="admin__product">
                <div className='content__heading'>
                    Tất cả sản phẩm

                    <div className='admin__product-btn-add'
                        onClick={() => {
                            setIsOpenCreateProductModal(true)
                        }}
                    >
                        <span class="material-icons">
                            post_add
                        </span>
                        Thêm mới</div>
                </div>

                <table className="table table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Tên</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Sale</th>
                            <th scope="col">Tồn kho</th>
                            <th scope="col">Đã bán</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products.length > 0 && products.map((product, index) => {
                                const { _id, title, price, quantity, sale, sold } = product
                                return (
                                    <tr key={_id} className='product__item'>
                                        <td>{title}</td>
                                        <td>{price}</td>
                                        <td>{sale}</td>
                                        <td>{quantity}</td>
                                        <td>{sold}</td>
                                        <td className='more-btn'>
                                            <span class="material-icons">
                                                more_vert
                                            </span>
                                            <div className='more-btn-list' >
                                                <div className='more-btn-item'
                                                    onClick={() => {
                                                        handleOnClickOpenFormEdit(product)
                                                    }}
                                                >
                                                    <span class="material-icons">
                                                        drive_file_rename_outline
                                                    </span>
                                                    <span>Chỉnh sửa</span>
                                                </div>
                                                <div className='more-btn-item'
                                                    onClick={() => handleDeleteProduct(_id)}
                                                >
                                                    <span class="material-icons">
                                                        delete_forever
                                                    </span>
                                                    <span>Xóa</span>
                                                </div>
                                                <div className='more-btn-item'>
                                                    <span class="material-icons">
                                                        feed
                                                    </span>
                                                    <span>Chi tiết</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>


            {
                isOpenCreateProductModal
                    ?
                    <Modal setIsOpen={setIsOpenCreateProductModal}>
                        <FormAddProduct
                            setIsOpen={setIsOpenCreateProductModal}
                            handleCreateProduct={handleCreateProduct}
                        />
                    </Modal>
                    : ''
            }

            {
                isOpenEditProductModal
                    ?
                    <Modal setIsOpen={setIsOpenEditProductModal}>
                        <FormEditProduct
                            setIsOpen={setIsOpenEditProductModal}
                            handleUpdateProduct={handleUpdateProduct}
                            productEdit={productEdit}
                        />
                    </Modal>
                    : ''
            }



        </div >
    )
}

export default AdminProducts