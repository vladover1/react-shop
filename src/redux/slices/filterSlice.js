import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty:'rating',
    }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action){
            console.log(state, 'action:', action)
            state.categoryId = action.payload
        },
        setSort(state, action){
            state.sort = action.payload
        },
        setSearchValue(state, action){
            state.searchValue = action.payload
        },
        setCurrentPage(state, action){
            state.currentPage = action.payload
        },
        setFilters(state, action){
             state.currentPage = Number(action.payload.currentPage)
             state.sort = action.payload.sort
             state.categoryId = Number(action.payload.categoryId)
        }
    }
})

export const selectSort = (state) => state.filterSlice.sort
export const selectFilter = (state) => state.filterSlice

export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer