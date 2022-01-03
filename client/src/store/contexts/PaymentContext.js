
import { createContext, useContext, useState, useEffect } from 'react'
import invoiceApi from '../../api/invoiceApi'
import { useAuthContext } from './AuthContext'
import { useCartContext } from './CartContext'
import { toast } from 'react-toastify'
import { useGlobalContext } from './GlobalContext'

const PaymentContext = createContext()


function PaymentContextProvider({ children }) {

    const { setIsSpinnerLoading } = useGlobalContext()
    const { products } = useCartContext()
    const { user } = useAuthContext()

    const [invoice, setInvoice] = useState({
        name: '',
        phonenumber: '',
        city: '',
        address: '',
        email: '',
        more: '',
        payBy: 'byCash',
        voucherPercent: 0,
        transportFee: 0,
        products: []
    })

    const [invoiceSuccess, setInvoiceSuccess] = useState({})


    useEffect(() => {
        if (user) {
            setInvoice({
                ...invoice,
                name: user.name,
                phonenumber: user.phonenumber,
                city: user.city,
                address: user.address,
                email: user.email,
            })
        }
    }, [user])

    //function
    async function handleSubmitPayment() {
        setIsSpinnerLoading(true)
        let newInvoice = {}
        let newProducts = []

        // set products to newInvoice
        if (products && products.length > 0) {
            products.forEach((product, index) => {
                const { title, price, sale, imageUrl } = product.productId
                const { quantity } = product

                newProducts[index] = {
                    title,
                    price,
                    sale,
                    imageUrl,
                    quantity,
                }
            })
        }

        newInvoice = {
            ...invoice,
            products: newProducts,
        }

        // send server

        const response = await invoiceApi.create(newInvoice)
        setIsSpinnerLoading(false)
        if (!response.success) {
            toast.error('Đặt hàng không thành công, vui lòng thử lại')
            return false
        }
        else {
            setInvoiceSuccess(response.newInvoice)
            return true
        }
    }

    const paymentContextData = {
        invoice,
        setInvoice,
        handleSubmitPayment,
        invoiceSuccess
    }

    return (
        <PaymentContext.Provider value={paymentContextData} >
            {children}
        </PaymentContext.Provider>
    )
}

export default PaymentContextProvider
export function usePaymentContext() {
    return useContext(PaymentContext)
}