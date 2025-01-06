import { createSlice } from "@reduxjs/toolkit";

function loginhandler(state,action){
    state.activeUser=action.payload.username
    state.userid=action.payload.userid
}

function signuphandler(state,action){
    state.activeUser=action.payload.username
    state.userid=action.payload.userid
}

function logouthandler(state,action){
    state.activeUser="Guest"
    state.userid=0
}

const auth=createSlice({
    name:"auth",
    initialState:{
        activeUser:"Guest",
        userid:0,
    },
    reducers:{
        login:loginhandler,
        signup:signuphandler,
        logout:logouthandler,
    }
})

export const {login,signup,logout}=auth.actions
export default auth.reducer