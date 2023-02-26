import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";
import axios from "axios";
import {useOutletContext} from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";

const Home = () => {
    const dispatch = useDispatch()
    const {categoryId, sort, currentPage} = useSelector(state => state.filterSlice)

    const searchValue = useOutletContext();

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
       dispatch(setCurrentPage(number))
    }

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://63ecde4fbe929df00cb3e18d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(response => {
                setItems(response.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage, category, sortBy, order, search])

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    const pizzas = items
        .map((obj) => <PizzaBlock key={obj.id} {...obj}/>)

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories categoryId={categoryId} onChangeCategory={onChangeCategory}/>
                    <Sort/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading ? skeletons : pizzas}
                </div>
                <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
            </div>
        </>
    );
};

export default Home;