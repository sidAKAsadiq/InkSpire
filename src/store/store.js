import {configureStore} from  '@reduxjs/toolkit'
import auth_reducer from './auth_slice.js'
import search_reducer from './search_slice.js'

const my_store = configureStore({
    reducer: {
        auth : auth_reducer,
        search : search_reducer
    }
}) 

export default my_store