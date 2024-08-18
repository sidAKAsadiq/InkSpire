import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    searched_docs : [],
    search_loader : false,
}

const search_slice = createSlice({
    name : 'search_slice',
    initialState : initial_state,
    reducers: {
        add_to_searched_docs : (state,action) => {
            state.searched_docs = action.payload
        },
        set_search_loader : (state,action) => {
            state.search_loader = action.payload
        }
    }
})

export default search_slice.reducer
export const {add_to_searched_docs , set_search_loader} = search_slice.actions