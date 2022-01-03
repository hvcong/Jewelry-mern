import dotenv from 'dotenv'
import { createContext, useEffect, useReducer, useContext, useState } from 'react'
import cartReducer from '../reducers/cartReducer'
import cartApi from '../../api/cartApi'
import * as actions from '../actions/cartAction'
import { useAuthContext } from './AuthContext'
import { useProductContext } from './ProductContext'
import { toast } from 'react-toastify'
import { useGlobalContext } from './GlobalContext'
dotenv.config()

const CartContext = createContext()

export function useCartContext() {
    return useContext(CartContext)
}

function CartContextProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, {})
    const { user, isAuthenticated } = useAuthContext()
    const { products } = useProductContext()
    const [totalPrice, setTotalPrice] = useState(0)
    const { setIsSpinnerLoading } = useGlobalContext()

    useEffect(() => {

        if (cart && cart.products)
            setTotalPrice(getTotalPrice(cart.products))

        function getTotalPrice(products) {
            return products.reduce((total, product) => {
                const { price, sale } = product.productId
                const { quantity } = product

                return total + (price - price / 100 * sale) * quantity
            }, 0)
        }
    }, [cart])

    useEffect(() => {
        if (isAuthenticated) {
            loadCart()
        } else {
            dispatch(actions.removeCart({}))
        }
    }, [user])


    async function loadCart() {
        setIsSpinnerLoading(true)
        const response = await cartApi.getAll()
        setIsSpinnerLoading(false)
        if (response.success) {
            dispatch(actions.setCart(response.cart))
        } else {
            toast.error('Có lỗi xảy ra, vui lòng liên hệ quản trị viên')
        }
    }

    function getNumOfProductInCart(products) {
        let count = 0;
        products.forEach(product => {
            count = count + product.quantity
        })
        return count
    }

    async function addProductToCart(productId, quantity) {
        setIsSpinnerLoading(true)
        const response = await cartApi.add(productId, quantity)
        setIsSpinnerLoading(false)
        if (response.success) {
            toast.success('Thêm sản phẩm thành công')
            loadCart()
        } else {
            toast.error('Thêm sản phẩm không thành công, vui lòng thử lại')
        }

    }

    async function plusProductInCart(productId) {
        setIsSpinnerLoading(true)
        const response = await cartApi.add(productId)
        setIsSpinnerLoading(false)
        if (response.success) {
            await loadCart()
            return true
        } else {
            toast.error('Thao tác không thành công, vui lòng thử lại')

            return false
        }
    }

    async function minusProductInCart(productId) {
        setIsSpinnerLoading(true)
        const response = await cartApi.minus(productId)
        setIsSpinnerLoading(false)
        if (response.success) {
            dispatch(actions.setCart(response.newCart))
            return true
        } else {
            toast.error('Thao tác không thành công, vui lòng thử lại')
            return false
        }
    }

    async function removeProductFromCart(productId) {
        setIsSpinnerLoading(true)
        const response = await cartApi.remove(productId)
        setIsSpinnerLoading(false)

        if (response.success) {
            dispatch(actions.setCart(response.newCart))
        }
        else {
            toast.error('Thao tác không thành công, vui lòng thử lại')
        }

    }

    async function resetCart() {
        setIsSpinnerLoading(true)
        const response = await cartApi.resetCart()
        setIsSpinnerLoading(false)

        if (response.success) {
            dispatch(actions.setCart({ ...cart, products: [] }))
        } else {
            alert('reset cart not success')
        }
    }



    const cartContextData = {
        products: cart.products,
        getNumOfProductInCart,
        addProductToCart,
        minusProductInCart,
        plusProductInCart,
        removeProductFromCart,
        totalPrice,
        resetCart
    }

    return (
        <CartContext.Provider value={cartContextData} >
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider

