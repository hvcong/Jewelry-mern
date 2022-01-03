import { SET_PRODUCTS } from '../constants'

function productReducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: payload
            }

        default:
            return state
    }
}

export default productReducer