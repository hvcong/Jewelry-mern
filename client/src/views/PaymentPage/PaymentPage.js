import './PaymentPage.scss'

import { useEffect } from 'react'
import PaymentInfor from './PaymentInfor/PaymentInfor'
import PaymentInvoice from './PaymentInvoice/PaymentInvoice'
import { usePaymentContext } from '../../store/contexts/PaymentContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCartContext } from '../../store/contexts/CartContext'
import { useAuthContext } from '../../store/contexts/AuthContext'
import { toast } from 'react-toastify'



function PaymentPage() {

    const { invoice, setInvoice, handleSubmitPayment } = usePaymentContext()
    const { user, isAuthenticated } = useAuthContext()
    const navigate = useNavigate()
    const { products, resetCart } = useCartContext()

    useEffect(() => {
        if (!isAuthenticated) {
            toast.warning('Vui lòng đăng nhập trước')
            navigate('/login')
        }

    }, [isAuthenticated])

    useEffect(() => {
        if (products && products.length === 0) {
            toast.warning('Vui lòng thêm sản phẩm')
            navigate('/products/all')
        }

    }, [products])



    //function
    async function handleLocalSubmit() {

        //simple validate at here
        for (const property in invoice) {
            if (invoice[property] === '') {
                toast.warning('Vui lòng điền đầy đủ thông tin')
                return
            }
        }

        // submit
        const response = await handleSubmitPayment()
        if (response) {
            toast.success('Đặt hàng thành công')
            navigate('/payment/success')
            await resetCart()
        }
    }

    return (
        <div className='container p-3 payment__page-container'>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <PaymentInfor
                        invoice={invoice}
                        setInvoice={setInvoice}
                    />
                </div>
                <div className='col-12 col-md-6'>
                    <PaymentInvoice
                        payByValue={invoice.payBy}
                        setPayByValue={(value) => setInvoice({ ...invoice, payBy: value })}
                        voucherPercent={invoice.voucherPercent}
                        handleLocalSubmit={handleLocalSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default PaymentPage