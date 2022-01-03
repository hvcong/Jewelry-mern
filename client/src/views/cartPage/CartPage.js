import './CartPage.scss'

import CartList from "./CartList/CartList"
import CartBill from "./CartBill/CartBill"
import { toast } from 'react-toastify'
import { useAuthContext } from '../../store/contexts/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function CartPage() {
    const { isAuthenticated } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            toast.warning('Vui lòng đăng nhập trước')
            navigate('/login')
        }

    }, [isAuthenticated])

    return (
        <div className="container p-3">
            <div className="row">
                <div className="col-12 col-lg-7 pb-4 cart__List-col">
                    <CartList />
                </div>
                <div className="col-12 col-lg-5 pb-4">
                    <CartBill />
                </div>
            </div>
        </div>
    )
}

export default CartPage