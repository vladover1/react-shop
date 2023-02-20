import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";
import axios from "axios";
import {useOutletContext} from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";

const Home = () => {

    const searchValue = useOutletContext();

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortType, setSortType] = useState({
        name: 'Популярности',
        sortProperty: 'rating',
    })
    const [categoryId, setCategoryId] = useState(0)

    const onChangeCategory = (index) => {
        setCategoryId(index)
    }

    const onChangeSort = (index) => {
        setSortType(index)
    }

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://63ecde4fbe929df00cb3e18d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(response => {
                setItems(response.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
        // eslint-disable-next-line
    }, [categoryId, sortType, searchValue, currentPage, category, sortBy, order, search])

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    const pizzas = items
        .map((obj) => <PizzaBlock key={obj.id} {...obj}/>)

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories categoryId={categoryId} onChangeCategory={onChangeCategory}/>
                    <Sort sortType={sortType} onChangeSort={onChangeSort}/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading ? skeletons : pizzas}
                </div>
                <Pagination onChangePage={number => setCurrentPage(number)}/>
            </div>
        </>
    );
};

export default Home;