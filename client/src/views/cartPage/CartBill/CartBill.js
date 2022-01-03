import './CartBill.scss'
import { useCartContext } from '../../../store/contexts/CartContext';
import { parsePriceToString } from '../../../utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePaymentContext } from '../../../store/contexts/PaymentContext';


function CartBill() {

    const { products } = useCartContext()
    const { invoice, setInvoice } = usePaymentContext()
    const [vourcherInput, setVoucherInput] = useState('')


    const { voucherPercent } = invoice


    //function
    function setVoucherPercent(value) {
        setInvoice({
            ...invoice,
            voucherPercent: value,
        })
    }

    function sumPrice(voucherPercent) {
        if (products && products.length > 0) {
            return products.reduce((sum, current) => {
                const { price, sale } = current.productId
                let total = sum + (price - price / 100 * sale) * current.quantity

                if (voucherPercent) total = total - total / 100 * voucherPercent

                return total;
            }, 0);
        }

        return 0
    }

    function handleVoucherSubmit() {
        if (vourcherInput) setVoucherPercent(20)
        else setVoucherPercent(0)
    }

    return (
        <div className="cart__bill">
            <div className='cart__bill-heading'>
                TỔNG SỐ LƯỢNG
            </div>
            <div className='cart__bill-group'>
                <div className='cart__bill-label'>Tổng phụ</div>
                <div className='cart__bill-price'>{parsePriceToString(sumPrice())} đ</div>
            </div>
            <div className='cart__bill-group cart__bill-voucher'>
                <span className="material-icons">
                    sell
                </span>
                <div className='cart__bill-voucher-enter'>
                    <input className='cart__bill-voucher-input'
                        name='voucher'
                        placeholder='Nhập mã giảm giá...'
                        value={vourcherInput}
                        onChange={(e) => setVoucherInput(e.target.value)}
                    />
                    <div className='cart__bill-voucher-btn'
                        onClick={handleVoucherSubmit}
                    >Áp dụng</div>
                </div>
            </div>
            <div className='cart__bill-group cart__bill-voucher-percent'>
                <div className='cart__bill-label'>Mã giảm giá</div>
                <div className='cart__bill-price'>{voucherPercent}%</div>
            </div>

            <div className='cart__bill-group'>
                <div className='cart__bill-label'>Tổng</div>
                <div className='cart__bill-price'>{parsePriceToString(sumPrice(voucherPercent))} đ</div>
            </div>

            <Link to='/payment' className='cart__bill-group cart__bill-btn'>
                Tiến hành thanh toán
            </Link>

        </div>
    )
}

export default CartBill