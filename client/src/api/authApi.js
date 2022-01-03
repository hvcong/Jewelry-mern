import dotenv from 'dotenv'
import fetchData from "./fetchClient"
dotenv.config()

const api = process.env.REACT_APP_API + 'auth'

const authApi = {

    getAll: async () => {
        try {
            return await fetchData(`${api}/users`)
        } catch (error) {
            return {
                success: false,
            }
        }
    },

    delete: async (id) => {
        try {
            return await fetchData(`${api}/users/${id}`, {
                method: 'DELETE'
            })
        } catch (error) {
            return {
                success: false,
            }
        }
    },

    checkAccessToken: async () => {
        try {
            return await fetchData(`${api}/check`, {
                method: 'GET'
            })
        } catch (error) {
            return {
                success: false,
            }
        }
    },

    login: async (loginData) => {
        try {
            return await fetchData(`${api}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)

            })

        } catch (err) {
            return { success: false }
        }
    },

    register: async (registerData) => {
        try {
            return await fetchData(`${api}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            })

        } catch (err) {
            return {
                success: false,
                message: 'Internal server error'
            }
        }
    },



}
export default authApi