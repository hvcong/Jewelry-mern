import { SET_CART, REMOVE_CART } from "../constants";

export function setCart(payload) {
    return {
        type: SET_CART,
        payload
    }
}

export function removeCart(payload) {
    return {
        type: REMOVE_CART,
        payload
    }
}

