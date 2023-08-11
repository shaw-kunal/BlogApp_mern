export const loginStart =()=>({
    type:'LOGIN_START'
})

export const loginSuccess =(user)=>
({
    type:'LOGIN_SUCCESS',
    payload:user,
})

export const LoginFailure =()=>({
    type:'LOGIN_FAILURE'
})
export const Logout =()=>({
    type:'LOGOUT'
})
export const updateStart =()=>({
    type:'UPDATE_START'
})

export const updateSuccess =(user)=>
({
    type:'UPDATE_SUCCESS',
    payload:user,
})

export const updateFailure =()=>({
    type:'UPDATE_FAILURE'
})
