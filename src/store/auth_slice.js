import {createSlice} from '@reduxjs/toolkit'

const initial_state = {
    is_authenticated : false,
    user_data : null
}

const auth_slice = createSlice({
    name : "auth_slice",
    initialState : initial_state,
    reducers : {
        login: (state,action) => {
            state.is_authenticated = true
            state.user_data = action.payload
        },
        logout: (state,action) => {
            state.is_authenticated = false
            state.user_data = null
        },    
    }
})

export default auth_slice.reducer
export const {login, logout} = auth_slice.actions