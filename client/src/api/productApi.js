import { api } from '../store/constants'
import fetchData from "./fetchClient"
const newApi = api + '/products'

const productApi = {

    getSome: async ({ page, filter }) => {
        const { current, limit } = page
        const { sort, order, field, category, eq, gt, gte, lt, lte, ne } = filter

        let queryFilter = ``
        if (sort) queryFilter += `&_sort=${sort}`
        if (order) queryFilter += `&_order=${order}`
        if (category) queryFilter += `&_category=${category}`
        if (field) queryFilter += `&_field=${field}`
        if (eq || eq == 0) queryFilter += `&_eq=${eq}`
        if (gt || gt == 0) queryFilter += `&_gt=${gt}`
        if (gte || gte == 0) queryFilter += `&_gte=${gte}`
        if (lt || lt == 0) queryFilter += `&_lt=${lt}`
        if (lte || lte == 0) queryFilter += `&_lte=${lte}`
        if (ne || ne == 0) queryFilter += `&_ne=${ne}`



        try {
            return await fetchData(`${newApi}?_page=${current}&_limit=${limit}${queryFilter}`)
        } catch (error) {
            return {
                success: false,
            }
        }
    },

    // for admin
    getAll: async () => {
        try {
            return await fetchData(`${newApi}/all`)
        } catch (error) {
            return {
                success: false,
            }
        }
    },

    get: async (id) => {
        try {

            return await fetchData(`${newApi}/${id}`)
        } catch (error) {
            return {
                success: false,
            }
        }
    },

    create: async (product) => {

        try {
            return await fetchData(`${newApi}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
        } catch (error) {
            return {
                success: false
            }
        }


    },

    delete: async (id) => {
        try {
            return await fetchData(`${newApi}/${id}`, {
                method: 'DELETE',
            })
        } catch (erorr) {
            return {
                success: false,
            }
        }

    },

    update: async ({ _id, ...productUpdate }) => {

        try {
            return await fetchData(`${newApi}/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productUpdate)
            })
        } catch (erorr) {
            return {
                success: false,
            }
        }
    },

}
export default productApi