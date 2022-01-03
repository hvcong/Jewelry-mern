import { SET_PRODUCTS } from "../constants";

export function setProducts(payload) {
    return {
        type: SET_PRODUCTS,
        payload
    }
}