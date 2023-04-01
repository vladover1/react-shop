import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";

export const fetchPizza = createAsyncThunk<Pizza[], Record<string, string>>(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const {currentPage, category, sortBy, order, search} = params
        const {data} = await axios.get<Pizza[]>(`https://63ecde4fbe929df00cb3e18d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,)
        return data
    }
)

type Pizza = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: number
    size: number
    count: number
}

interface PizzaSliceState {
    status: 'loading' | 'success' | 'error'
    items: Pizza[]
}

const initialState: PizzaSliceState = {
    status: 'loading',
    items: [],
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
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

export const selectPizzaData = (state: RootState) => state.pizzaSlice

export default pizzaSlice.reducer