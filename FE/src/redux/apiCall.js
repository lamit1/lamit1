import { publicRequest, userRequest } from "../requestMethods"
import { registerFailure,
     registerStart,
      registerSuccess,
       loginFailure,
        loginStart,
         loginSuccess  } from "./userRedux"



export const register = async(dispatch,user) => {
    dispatch(registerStart())
    try {
        const res = await userRequest.post("/auth/register",user)
        dispatch(registerSuccess(res.data))
    } catch (err) {
        dispatch(registerFailure())
    }
}

export const login = async(dispatch,user) => {
    const headers = {
        "token":"Lam sk_test_51LzeleFSIGf6Tw91qN3ornhDWqX1F1WZZnBwssHmCh0ewwLv2GIwlvAdhGU9Y9XQhLNOXbmimISgobqRbGEP9gVL00mqfAfRlO"    
    }
    dispatch(loginStart())
    try{
        const res= await userRequest.post("/auth/login", user, {headers:{headers}})
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
}