import './FormAddProduct.scss'
import { useState, useRef } from 'react'

function FormAddProduct({ setIsOpen, handleCreateProduct }) {

    const formMessageRef = useRef()

    const [stateForm, setStateForm] = useState({
        title: '',
        description: '',
        imageUrl: '',
        price: '',
        sale: '',
        quantity: '',
        category: 'watch',
        material: 'synthetic'
    })

    const { title, description, imageUrl, price, sale, quantity, category, material } = stateForm

    function handleOnChange(e) {
        setStateForm({
            ...stateForm,
            [e.target.name]: e.target.value
        })
    }

    async function handleOnSubmit(e) {
        e.preventDefault()

        //simple validate
        if (!title || !price || !imageUrl) {
            formMessageRef.current.innerText = 'Vui lòng điền đầy đủ thông tin vào form!!'
        } else {
            // all good
            await handleCreateProduct(stateForm)
            setIsOpen(false)
        }

    }

    return (
        <div className="modal__create-products">
            <div className="modal__heading">
                <h3>Thêm mới sản phẩm</h3>
                <p
                    ref={formMessageRef}
                    className="modal__form-massage"></p>
            </div>

            <div className="modal__body">
                <form className="form__create-product p-4">
                    <div className="row">
                        <div className="form-group col-12">
                            <label htmlFor="title">Tên sản phẩm</label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleOnChange}
                                className="form-control"
                                id="title"
                                placeholder="Nhập tên sản phẩm..." />
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="description">Mô tả</label>
                            <textarea rows="4"
                                name="description"
                                value={description}
                                onChange={handleOnChange}
                                className="form-control" id="description" placeholder="Mô tả sản phẩm..." />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="imageUrl">Hình ảnh</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={imageUrl}
                                onChange={handleOnChange}
                                className="form-control" id="imageUrl" placeholder="Số lượng..." />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="price">Giá sản phẩm</label>
                            <input
                                type="number"
                                name="price"
                                value={price}
                                onChange={handleOnChange}
                                className="form-control" id="price" placeholder="Giá..." />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="sale">Khuyến mãi</label>
                            <input
                                type="number"
                                name="sale"
                                value={sale}
                                onChange={handleOnChange}
                                className="form-control" id="sale" placeholder="Khuyến mãi..." />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="quantity">Số lượng</label>
                            <input
                                type="number"
                                name="quantity"
                                value={quantity}
                                onChange={handleOnChange}
                                className="form-control" id="quantity" placeholder="Số lượng..." />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="category">Loại sản phẩm</label>
                            <select
                                name="category"
                                value={category}
                                onChange={handleOnChange}

                                id="category" className="form-control">
                                <option value="watch" >Đồng hồ</option>
                                <option value="ring">Nhẫn</option>
                            </select>
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="material">Chất liệu</label>
                            <select
                                name="material"
                                value={material}
                                onChange={handleOnChange}
                                id="material" className="form-control">
                                <option value="diamond" >Kim cương</option>
                                <option value="gold">Vàng</option>
                                <option value="silver">Bạc</option>
                                <option value="synthetic">Tổng hợp</option>
                            </select>
                        </div>

                        <div className="form-group col-12 ">
                            <div className="form__btn-group">

                                <span className="btn btn-danger"
                                    onClick={() => setIsOpen(false)}
                                >Hủy</span>
                                <button type="submit" className="btn btn-primary ml-3"
                                    onClick={handleOnSubmit}
                                >Lưu</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default FormAddProduct