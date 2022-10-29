import {createSlice} from "@reduxjs/toolkit";
import {quizSlice} from "./quizSlice";

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
            }
        }
    }
})

export const { isUserAdmin } = loginSlice.actions

export default loginSlice.reducer;