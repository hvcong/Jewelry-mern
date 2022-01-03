import './PaymentInvoice.scss'

import { useEffect, useState } from 'react'
import { useCartContext } from '../../../store/contexts/CartContext'
import { parsePriceToString } from '../../../utils'


function PaymentInvoice({ payByValue, setPayByValue, voucherPercent, handleLocalSubmit }) {

    const { products, totalPrice } = useCartContext()

    return (
        <div className='invoice__container'>
            <div className='invoice__heading'>ĐƠN HÀNG CỦA BẠN</div>
            <div className='invoice__group invoice__group-heading'>
                <div className='invoice__group-left text-bold'>SẢN PHẨM</div>
                <div className='invoice__group-right text-bold'>TỔNG</div>
            </div>

            {
                products && products.length > 0 ?
                    products.map(product => {
                        let { title, price, _id, sale } = product.productId
                        const { quantity } = product
                        price = (price - price / 100 * sale) * quantity
                        return (
                            <div className='invoice__group' key={_id}>
                                <div className='invoice__group-left'>{title}<b>× {quantity}</b></div>
                                <div className='invoice__group-right text-bold text-no-wrap'>{parsePriceToString(price)}đ</div>
                            </div>
                        )
                    })
                    :
                    '0'
            }

            <div className='invoice__group'>
                <div className='invoice__group-left text-bold'>Tổng phụ</div>
                <div className='invoice__group-right text-bold text-no-wrap'>{parsePriceToString(totalPrice)} đ</div>
            </div>

            <div className='invoice__group'>
                <div className='invoice__group-left text-bold'>Giao hàng</div>
                <div className='invoice__group-right'>Giao hàng miễn phí</div>
            </div>

            <div className='invoice__group'>
                <div className='invoice__group-left text-bold'>Phiếu giảm giá</div>
                <div className='invoice__group-right text-bold text-no-wrap'>{voucherPercent}%</div>
            </div>

            <div className='invoice__group'>
                <div className='invoice__group-left text-bold'>Tổng</div>
                <div className='invoice__group-right text-bold text-no-wrap'>
                    {parsePriceToString(totalPrice - totalPrice / 100 * voucherPercent)}
                    đ</div>
            </div>

            <div className='invoice__group invoice__group-radio'>
                <div className='invoice__group-left'>
                    <input type='radio' name='payBy' id='byCash' value='byCash' className='invoice__group-radio'
                        checked={payByValue === 'byCash'}
                        onChange={() => setPayByValue('byCash')}
                    />
                    <label htmlFor='byCash' className='text-bold'>Trả tiền mặt khi giao hàng</label>
                </div>
                <div className='invoice__group-right pay__sub-text'
                    style={payByValue === 'byCash' ? {
                        height: 'unset',
                        paddingTop: '12px',
                    } : {}}
                >Trả tiền mặt khi giao hàng.</div>
            </div>

            <div className='invoice__group invoice__group-radio'>
                <div className='invoice__group-left'>
                    <input type='radio' name='payBy' value='byBank' id='byBank' className='invoice__group-radio'
                        checked={payByValue === 'byBank'}
                        onChange={() => setPayByValue('byBank')}
                    />
                    <label htmlFor='byBank' className='text-bold'>Chuyển khoản ngân hàng</label>
                </div>
                <div className='invoice__group-right pay__sub-text'
                    style={payByValue === 'byBank' ? {
                        height: 'unset',
                        paddingTop: '12px',
                    } : {}}
                >Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.</div>
            </div>
            <div className='invoice__group invoice__group-btn'>
                <div className='invoice__btn'
                    onClick={handleLocalSubmit}
                >ĐẶT HÀNG</div>
            </div>

        </div>
    )
}

export default PaymentInvoice