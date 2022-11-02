import {createSlice} from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
const initialState = {
    isAdmin:false,
    token:''
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        isUserAdmin:(state,{payload}) => {
            if(payload.email === 'admin@gmail.com' && payload.password === 'admin123') {
                localStorage.setItem('token', 'adswetr234ss^&#$2werewre"')
                state.token = "adswetr234ss^&#$2werewre"
                toast.success('Login successfully')
            } else {
                toast.error('Password or email is wrong')
            }
        },
        logOutFromAdmin:(state) => {
            localStorage.removeItem('token')
            toast.success('logout successfully')
        }
    }
})

export const { isUserAdmin, logOutFromAdmin} = loginSlice.actions

export default loginSlice.reducer;