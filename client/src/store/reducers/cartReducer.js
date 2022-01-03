import { REMOVE_CART, SET_CART } from '../constants'

function cartReducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case SET_CART:
            return {
                ...state,
                ...payload
            }

        case REMOVE_CART:
            return payload

        default:
            return state
    }
}

export default cartReducer