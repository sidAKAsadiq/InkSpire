import {configureStore} from  '@reduxjs/toolkit'
import auth_reducer from './auth_slice.js'

const my_store = configureStore({
    reducer: auth_reducer
}) 

export default my_store