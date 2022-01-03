import './QuantityProduct.scss'

function QuantityProduct({ quantity, setQuantity }) {

    return (
        <div className='quantity__container'>

            <span className="quantity-btn quantity-down"
                onClick={() => {
                    if (quantity !== 1) {
                        setQuantity(quantity - 1)
                    }
                }}
            >-</span>
            <span className="quantity-num">{quantity}</span>
            <span className="quantity-btn quantity-up"
                onClick={() => setQuantity(quantity + 1)}
            >+</span>
        </div>
    )
}

export default QuantityProduct
