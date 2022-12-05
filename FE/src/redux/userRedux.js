import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser: null,
        isFetching:false,
        error:false
    },
    reducers:{
        registerStart:(state)=>{
            state.isFetching=true
        },
        registerSuccess:(state, action)=>{
            state.error = false
            state.isFetching=false
            state.currentUser=action.payload
        },
        registerFailure:(state)=>{
            state.error=true
            state.isFetching=false
        },
        loginStart:(state)=>{
            state.isFetching = true
        },
        loginSuccess:(state,action)=>{
            state.error = false
            state.isFetching=false
            state.currentUser=action.payload
        },
        loginFailure:(state)=>{
            state.error=true
            state.isFetching=false
        },
        logout:(state)=>{
            state.currentUser = null
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, registerFailure, registerStart, registerSuccess, logout } = userSlice.actions;
export default userSlice.reducer;