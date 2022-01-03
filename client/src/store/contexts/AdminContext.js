import dotenv from 'dotenv'
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import authApi from '../../api/authApi'
import invoiceApi from '../../api/invoiceApi';
import productApi from '../../api/productApi'
dotenv.config();


const AdminContext = createContext()

function AdminContextProvider({ children }) {

    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [invoices, setInvoices] = useState([])

    const [navItem, setNavItem] = useState('')

    useEffect(() => {

        async function fetchUsers() {
            const response = await authApi.getAll()
            if (response.success && response.users) setUsers(response.users)
        }

        async function fetchProducts() {
            const response = await productApi.getAll()
            if (response.success && response.products) setProducts(response.products)
        }

        async function fetchInvoices() {
            const response = await invoiceApi.getAll()
            if (response.success && response.invoices) setInvoices(response.invoices)
        }

        fetchUsers()
        fetchProducts()
        fetchInvoices()
    }, [])

    //function for product
    async function addProduct(product) {
        const response = await productApi.create(product)

        if (response.success && response.newProduct) {
            setProducts([...products, response.newProduct])
        }
        return response
    }

    async function updateProduct(product) {
        const response = await productApi.update(product)
        if (response.success && response.newProduct) {
            const newProduct = response.newProduct
            const newProducts = products.map(product => {
                if (product._id === newProduct._id) {
                    return newProduct
                }
                return product
            })

            setProducts(newProducts)
        }
        return response
    }

    async function deleteProduct(id) {
        const response = await productApi.delete(id)
        if (response.success) {
            const newProducts = products.filter(product => {
                return product._id !== id
            })

            setProducts(newProducts)
        }

        return response

    }


    //function for user
    async function deleteUser(id) {
        const response = await authApi.delete(id)

        if (response.success) {
            const newUsers = users.filter(user => {
                return user._id !== id
            })
            setUsers(newUsers)
        }

        return response
    }


    //function for invoices
    async function deleteOneInvoice(id) {
        const response = await invoiceApi.deleteOne(id)

        if (response.success) {
            const newInvoices = invoices.filter(invoice => {
                return invoice._id !== id
            })
            setInvoices(newInvoices)
        }

        return response
    }

    async function switchShipping(id) {
        const response = await invoiceApi.updateOne({ id, status: 'shipping' })


        if (response.success) {
            const newInvoices = invoices.map(invoice => {
                if (invoice._id === id) {
                    let newInvoice = invoice
                    newInvoice.status = 'shipping'
                    return newInvoice
                }
                return invoice
            })

            setInvoices(newInvoices)
        }

        return response
    }


    const AdminContextData = {
        navItem,
        setNavItem,
        users,
        products,
        invoices,
        setProducts,
        updateProduct,
        deleteProduct,
        addProduct,
        deleteUser,
        deleteOneInvoice,
        switchShipping,
    }

    return (
        <AdminContext.Provider value={AdminContextData} >
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
export function useAdminContext() {
    return useContext(AdminContext)
} 