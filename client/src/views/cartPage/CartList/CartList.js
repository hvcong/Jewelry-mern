import './CartList.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../../store/contexts/CartContext'
import CartListItem from './CartListItem/CartListItem'


function CartList() {

    const { products, minusProductInCart, plusProductInCart, removeProductFromCart } = useCartContext()

    return (
        <div className="cart__list-container">
            <table className='cart__table'>
                <tr>
                    <th colSpan={3}>Sản phẩm</th>
                    <th className='d-none d-sm-block'>Giá</th>
                    <th >Số lượng</th>
                    <th className='d-none d-sm-block'>Tổng</th>
                </tr>
                {
                    products && products.length > 0 && products.map(product => {
                        return (
                            <CartListItem
                                key={product.productId._id}
                                product={product}
                                minusFunc={minusProductInCart}
                                plusFunc={plusProductInCart}
                                removeFunc={removeProductFromCart}
                            />
                        )
                    })
                }
            </table>

            <div className='cart__list-bottom'>
                <Link to='/products/all' className='cart__list-bottom-btn'>
                    <span className="material-icons">
                        west
                    </span>
                    Tiếp tục xem sản phẩm
                </Link>
            </div>
        </div>
    )
}

export default CartList