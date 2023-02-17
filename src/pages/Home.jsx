import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
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

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://63ecde4fbe929df00cb3e18d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
            .then(response => {
            setItems(response.data)
            setIsLoading(false)
        })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories categoryId={categoryId} onChangeCategory={onChangeCategory}/>
                    <Sort sortType={sortType} onChangeSort={onChangeSort}/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {
                        isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) : items.map((obj) =>
                            <PizzaBlock key={obj.id} {...obj}/>)
                    }
                </div>
            </div>
        </>
    );
};

export default Home;