import dotenv from 'dotenv'
import fetchData from "./fetchClient"
dotenv.config()

const api = process.env.REACT_APP_API + 'invoices'

const invoiceApi = {

    // click payment
    create: async (invoice) => {
        try {

            const response = await fetchData(`${api}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(invoice)
            })

            return response
        } catch (err) {
            return {
                success: false,
            }
        }
    },

    // for admin
    getAll: async () => {
        try {
            return await fetchData(`${api}/admin`, {
                method: 'GET',
            })


        } catch (error) {
            return {
                success: false,
            }
        }


    },

    deleteOne: async (id) => {
        try {
            const response = await fetchData(`${api}/admin/${id}`, {
                method: 'DELETE'
            })

            return response
        } catch (error) {
            return {
                success: false,
            }
        }
    },

    updateOne: async ({ id, ...invoiceUpdate }) => {
        try {

            const response = await fetchData(`${api}/admin/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceUpdate),
            })

            return response
        } catch (error) {
            return {
                success: false,
            }
        }

    },
}
export default invoiceApi