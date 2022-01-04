import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import productApi from '../../api/productApi'
import { useCartContext } from '../../store/contexts/CartContext'
import { parsePriceToString } from '../../utils'
import Comment from './Comment'
import './ProductDetailPage.scss'
import QuantityProduct from '../../components/QuantityProduct/QuantityProduct'
import { toast } from 'react-toastify'
import { useGlobalContext } from '../../store/contexts/GlobalContext'

function ProductDetailPage() {

    const { id } = useParams()
    const [product, setProduct] = useState({})
    const { addProductToCart } = useCartContext()
    const [quantity, setQuantity] = useState(1)
    const { setIsSpinnerLoading } = useGlobalContext()


    // https://pacific-mesa-67716.herokuapp.com/images/sp34-300x300.jpg
    const { _id, title, imageUrl, price, sale, category, material, description } = product

    useEffect(() => {
        async function fetchProduct() {
            setIsSpinnerLoading(true)
            const response = await productApi.get(id)
            setIsSpinnerLoading(false)

            if (response.success) {
                setProduct(response.product)
            }
            else {
                toast.error('Thao tác không thành công, vui lòng thử lại')
            }
        }

        fetchProduct()
    }, [id])



    return (
        <div className="product__detail-container container">
            <div className="product__detail-section">
                <div className="product__info row">
                    <div className="col-12 col-md-6">
                        <img className="product__info-img" src={imageUrl} />
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="product__info-right">
                            <div className="product__info-path">
                                <Link to="/" className="product__info-path-link">Trang chủ</Link>/
                                <Link to="/products" className="product__info-path-link">Trang sức</Link>/
                                <Link to="" className="product__info-path-link">{category}</Link>
                            </div>

                            <h2 className="product__info-title">{title}</h2>
                            <span className="line"></span>
                            <div className="product__info-price-group">
                                <span className="product__info-price-current">{
                                    sale ? parsePriceToString(Math.floor(price - price / 100 * sale)) : parsePriceToString(price)} đ</span>
                                <span className="product__info-price-old">{
                                    sale ? parsePriceToString(price) + ' đ' : ''} </span>
                            </div>
                            <div className="product__info-material">
                                <span>Chất liệu: </span>
                                <span>{material}</span>
                            </div>
                            <p className="product__info-des">{description}</p>

                            <div className="product__info-group">
                                <QuantityProduct quantity={quantity} setQuantity={setQuantity} />

                                <div className="product__info-btn"
                                    onClick={async () => {
                                        await addProductToCart(_id, quantity)
                                    }}
                                >
                                    Thêm vào giỏ</div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div className="product__detail-section">
                <div className="product__sub">
                    <div className="product__sub-tabs">
                        <div className="product__sub-tab ">Mô tả</div>
                        <div className="product__sub-tab active">đánh giá (0)</div>
                    </div>
                    <div className="product__sub-body">
                        <div className="product__sub-body-item d-none">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className="product__sub-body-item">
                            <div className="product__sub-body-comments">
                                <Comment />
                                <Comment />
                                <Comment />
                            </div>

                            <div className="comment__add">
                                <div className="comment__avatar">
                                    <img className="comment__avatar-img" src="http://localhost:5000/images/avatar.jpg" />
                                </div>
                                <input placeholder="Nhận xét của bạn về sản phẩm...." className="comment__add-input" />
                                <span className="comment__add-btn">Gửi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetailPage