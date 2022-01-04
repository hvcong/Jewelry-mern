import { createContext, useReducer, useEffect, useContext, useState } from "react";
import productApi from "../../api/productApi";
import productReducer from "../reducers/productReducer";
import { setProducts } from "../actions/productAction"
import { toast } from "react-toastify";
import { useGlobalContext } from '../contexts/GlobalContext'

const ProductContext = createContext()

export function useProductContext() {
    return useContext(ProductContext)
}


function ProductContextProvider({ children }) {

    const { setIsSpinnerLoading } = useGlobalContext()
    const [state, dispatch] = useReducer(productReducer, {
        products: [],
    })

    const [page, setPage] = useState({
        current: 1,
        limit: 12,
        total: 1,
    })

    const [maxPrice, setMaxPrice] = useState(0)
    const [minPrice, setMinPrice] = useState(0)

    const [filter, setFilter] = useState({
        sort: '',
        order: '',
        field: '',
        category: '',
        gte: null, // min price
        lte: null, // max price

    })

    async function loadProducts() {
        setIsSpinnerLoading(true)
        const response = await productApi.getSome({
            page,
            filter
        })
        setIsSpinnerLoading(false)

        if (response.success) {
            setMaxPrice(response.maxPrice)
            setMinPrice(response.minPrice)
            setPage(response.pagination)
            dispatch(setProducts(response.products))
        } else {
            toast.error('Đường mạng không ổn định')
        }
    }

    useEffect(() => {
        async function fetchProducts() {
            await loadProducts()
        }
        fetchProducts()

    }, [page.current, page.limit, filter])


    const contextData = {
        products: state.products,
        page: page,
        setPage: setPage,
        filter,
        setFilter,
        maxPrice,
        minPrice
    }

    return (
        <ProductContext.Provider value={contextData} >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider