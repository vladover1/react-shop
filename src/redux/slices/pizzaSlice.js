import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";


export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const {currentPage, category, sortBy, order, search} = params
        const {data} = await axios.get(`https://63ecde4fbe929df00cb3e18d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,)
        return data
    }

)

const initialState = {
    items: [],
    status: '',
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizza.pending, (state) => {
                state.status = 'loading';
                state.items = [];


            })
            .addCase(fetchPizza.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';

            })
            .addCase(fetchPizza.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            });
    }
})

// export const {} = pizzaSlice.actions

export default pizzaSlice.reducer