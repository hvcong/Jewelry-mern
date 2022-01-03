import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuantityProduct from '../../../../components/QuantityProduct/QuantityProduct'
import { parsePriceToString } from '../../../../utils'

function CartListItem({ product, minusFunc, plusFunc, removeFunc }) {
    const { title, price, imageUrl, _id, sale } = product.productId

    const { quantity } = product

    const [quantityLocal, setQuantityLocal] = useState(quantity)

    async function handleSetQuantityLocal(number) {
        if (number > quantityLocal) {
            if (await plusFunc(_id))
                setQuantityLocal(number)
        }
        else {
            if (await minusFunc(_id))
                setQuantityLocal(number)
        }
    }

    return (

        <tr>
            <td className='cart__table-item-close-btn'>
                <span className="material-icons"
                    onClick={() => removeFunc(_id)}
                >
                    cancel
                </span>
            </td>
            <td className='cart__table-item-img-wrap'>
                <Link to={`/products/${_id}`}>
                    <img src={imageUrl} />
                </Link>
            </td>
            <td className='cart__table-item-name'>
                <Link to={`/products/${_id}`}>{title}</Link>
                <div className='cart__table-item-price-mobile d-sm-none d-block'>
                    {quantity} x <b>{parsePriceToString(price - price / 100 * sale)} đ</b>
                </div>
            </td>
            <td className='cart__table-item-price d-none d-sm-block'>
                <span className='cart__table-item-price-current'>{parsePriceToString(price - price / 100 * sale)} đ</span>
                <span className='cart__table-item-price-old'>{parsePriceToString(price)} đ</span>
            </td>
            <td className='cart__table-item-quatity'>
                <QuantityProduct quantity={quantityLocal} setQuantity={handleSetQuantityLocal} />
            </td>
            <td className='cart__table-item-price d-none d-sm-block'>{parsePriceToString((price - price / 100 * sale) * quantity)} đ</td>
        </tr>
    )
}

export default CartListItem