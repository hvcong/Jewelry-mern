import './PaymentSuccessPage.scss'
import { usePaymentContext } from '../../store/contexts/PaymentContext'
import { parsePriceToString } from '../../utils/index'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function PaymentSuccess() {

    const navigate = useNavigate()

    const { invoiceSuccess } = usePaymentContext()

    const {
        products,
        _id,
        name,
        address,
        phonenumber,
        payBy,
        status,
        transportFee,
        voucherPercent,
        createdAt
    } = invoiceSuccess


    useEffect(() => {
        if (!products) navigate('/')
    }, [])

    //function
    function getTotalPrice(products) {
        if (products && products.length > 0) {
            return products.reduce((total, product) => {
                const { price, sale } = product
                const { quantity } = product

                return total + (price - price / 100 * sale) * quantity
            }, 0)
        }
        return 0
    }

    return (
        <div className="container payment__success">
            <div className='row'>
                <div className='col-12 col-md-7 order-1 order-md-0'>
                    <div className='payment__success-bill'>
                        <div className='payment__success-bill-heading'>
                            CHI TIẾT HÓA ĐƠN
                        </div>
                        <div className='payment__success-bill-body'>
                            <div className='payment__success-bill-group'>
                                <div className='payment__success-bill-left'>SẢN PHẨM</div>
                                <div className='payment__success-bill-right'>TỔNG</div>
                            </div>
                            {
                                products && products.length > 0 ?
                                    products.map(product => {
                                        let { title, price, _id, quantity, sale } = product

                                        price = (price - price / 100 * sale) * quantity
                                        return (
                                            <div className='payment__success-bill-group' key={_id}>
                                                <div className='payment__success-bill-left light-text'>{title}<b>× {quantity}</b></div>
                                                <div className='payment__success-bill-right text-nowrap'>{parsePriceToString(price)}đ</div>
                                            </div>
                                        )
                                    })
                                    :
                                    ''
                            }
                            <div className='payment__success-bill-group'>
                                <div className='payment__success-bill-left'>Tổng số phụ:</div>
                                <div className='payment__success-bill-right text-nowrap'>{parsePriceToString(getTotalPrice(products))} đ</div>
                            </div>
                            <div className='payment__success-bill-group'>
                                <div className='payment__success-bill-left'>Phí giao hàng:</div>
                                <div className='payment__success-bill-right light-text'>{transportFee ? parsePriceToString(transportFee) : 'Giao hàng miễn phí'}</div>
                            </div>
                            {
                                voucherPercent ? (
                                    <div className='payment__success-bill-group'>
                                        <div className='payment__success-bill-left'>Giảm giá: </div>
                                        <div className='payment__success-bill-right'>{voucherPercent}</div>
                                    </div>
                                ) : ''
                            }

                            <div className='payment__success-bill-group'>
                                <div className='payment__success-bill-left text-nowrap'>Phương thức thanh toán:</div>
                                <div className='payment__success-bill-right light-text'>
                                    {
                                        payBy === 'byCash' ? 'Trả tiền mặt khi nhận hàng' : 'Thanh toán bằng hình thức chuyển khoản'
                                    }
                                </div>
                            </div>

                            <div className='payment__success-bill-group'>
                                <div className='payment__success-bill-left'>Tổng cộng:</div>
                                <div className='payment__success-bill-right text-nowrap'>{parsePriceToString(getTotalPrice(products) / 100 * (100 - voucherPercent) - transportFee)} đ</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-5'>
                    <div className='payment__success-message'>
                        <p className="payment__success-heading">Cảm ơn bạn. Đơn hàng của bạn đã được nhận.</p>
                        <ul className="payment__success-list">
                            <li>Mã đơn hàng: <b>{_id}</b></li>
                            <li>Ngày: <b> {createdAt}</b></li>
                            <li>Người nhận hàng: <b>{name}</b></li>
                            <li>Địa chỉ: <b>{address}</b></li>
                            <li>Tổng cộng: <b>{parsePriceToString(getTotalPrice(products) / 100 * (100 - voucherPercent) - transportFee)} đ</b></li>
                            <li>Phương thức thanh toán: <b>{
                                payBy === 'byCash' ? 'Trả tiền mặt khi nhận hàng' : 'Thanh toán bằng hình thức chuyển khoản'
                            }</b></li>
                        </ul>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PaymentSuccess