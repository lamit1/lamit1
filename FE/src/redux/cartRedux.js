import {createSlice} from "@reduxjs/toolkit"



const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct:(state, action) => {
            if(state.products.length === 0) {
                state.products.push(action.payload)
                state.quantity += action.payload.quantity
            } else {
                const cartItem = state.products.find((item) => item._id === action.payload._id)
                if(!cartItem) {
                    state.products.push(action.payload)
                    state.quantity += action.payload.quantity
                } else {
                    state.quantity += action.payload.quantity
                    cartItem.quantity += action.payload.quantity
                }
            }
            state.total += action.payload.price* action.payload.quantity
        }
        ,
        increase:(state, {payload}) =>{
            const cartItem = state.products.find((item) => item._id === payload)
            cartItem.quantity = cartItem.quantity + 1
        },
        decrease:(state, {payload}) =>{
            const cartItem = state.products.find((item) => item._id === payload)
            cartItem.quantity = cartItem.quantity > 0 ? cartItem.quantity -1 : cartItem.quantity
        }
        ,
        remove:(state,{payload})=>{
            const itemId = payload
            state.products = state.products.filter((item)=>
            item._id !== itemId
            )
            let total = 0
            for (let index = 1; index < state.products.length; index++) {
                const element = state.products[index];
                total = total+element.price * element.quantity
            }
            state.total = total
            state.quantity = state.products.length
        },
    }
})
export const {addProduct, decrease , increase, remove} = cartSlice.actions
export default cartSlice.reducer