import './Product.scss'
import { Link, useNavigate } from "react-router-dom"
import { parsePriceToString } from '../../utils'
import { useCartContext } from "../../store/contexts/CartContext"
import { useAuthContext } from '../../store/contexts/AuthContext'
import { toast } from 'react-toastify'

function Product({ product }) {
    const { addProductToCart } = useCartContext()
    const { isAuthenticated } = useAuthContext()
    const { imageUrl, title, price, sale, _id } = product
    const navigate = useNavigate()


    //function
    function handleAddProduct(id) {
        if (!isAuthenticated) {
            toast.warning('Vui lòng đăng nhập trước!');
            navigate('/login')
        }
        else {
            addProductToCart(_id)
        }
    }



    return (
        <div className='product__wrap'>
            <div className={sale ? 'notifi__sale' : 'd-none'}>
                <span className='notifi__sale-percent'>{sale}%</span>
                <span className='notifi__sale-text'>SALE</span>
                <span className='notifi__sale-affter'></span>
            </div>

            <Link to={'/products/' + _id} className="product__image product__link">
                <img src={imageUrl} />
            </Link>

            <div className="product__body">
                <Link to={'/products/' + _id} className="product__title product__link">{title}</Link>
                <div className="product__price">
                    <span className="product__price-current">
                        {
                            parsePriceToString(Math.floor(price - price / 100 * sale))
                        } đ</span>
                    <span className={sale ? 'product__price-old' : 'd-none'}>
                        <span className='product__price-old-num'>
                            {parsePriceToString(price)} đ
                        </span>
                        - {sale}%
                    </span>
                </div>
                <div
                    onClick={() => { handleAddProduct(_id) }}
                    className="product__btn">
                    Thêm vào giỏ
                </div>
            </div>
        </div>
    )
}

export default Product