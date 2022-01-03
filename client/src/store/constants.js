import dotenv from 'dotenv';
dotenv.config()

export const SET_PRODUCTS = 'SET_PRODUCTS'

export const SET_CART = 'SET_CART'
export const REMOVE_CART = 'REMOVE_CART'
export const api = process.env.NODE_ENV !== 'production'
    ? 'https://localhost:5000/api'
    : 'https://pacific-mesa-67716.herokuapp.com/api'