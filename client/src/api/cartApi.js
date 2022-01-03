import dotenv from 'dotenv'
import fetchData from "./fetchClient"
dotenv.config()

const api = process.env.REACT_APP_API + 'cart'

const cartApi = {

    getAll: async () => {
        try {
            return await fetchData(`${api}`)
        } catch (error) {
            return {
                success: false,
            }
        }
    },

    add: async (productId, quantity) => {

        try {
            return await fetchData(`${api}/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: quantity ? quantity : 1 })
            })
        } catch (error) {
            return {
                success: false,
            }
        }
    },

    plus: async (productId) => {
        try {
            let response = await fetchData(`${api}/${productId}/plus`, {
                method: 'POST'
            })

            return response

        } catch (error) {
            return {
                success: false,
            }
        }
    },

    minus: async (productId) => {
        try {
            let response = await fetchData(`${api}/${productId}/minus`, {
                method: 'POST'
            })

            return response

        } catch (error) {
            return {
                success: false,
            }
        }
    },

    remove: async (productId) => {
        try {
            const response = await fetchData(`${api}/${productId}`, {
                method: 'DELETE',
            })

            return response

        } catch (error) {
            return {
                success: false,
            }
        }
    },

    resetCart: async () => {
        try {
            const response = await fetchData(`${api}/reset`, {
                method: 'DELETE',
            })

            return response

        } catch (error) {
            return {
                success: false,
            }
        }
    }

}
export default cartApi