import React, {useRef} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from 'qs';
import {sortList} from "../components/Sort";
import {fetchPizza, selectPizzaData} from "../redux/slices/pizzaSlice";


const Home: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `search=${searchValue}` : ''


        dispatch(
            //@ts-ignore
            fetchPizza({
                sortBy,
                order,
                category,
                search,
                //@ts-ignore
                currentPage,
            }),
        );

        window.scrollTo(0, 0)
    }


    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty, categoryId, currentPage,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage])


    useEffect(() => {
        getPizzas().then()
    }, [currentPage, categoryId, sort, searchValue])

    useEffect(() => {
        window.scrollTo(0, 0)

        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({
                ...params, sort,
            }),)
            isSearch.current = true

        }

        isSearch.current = false;
    }, [])


    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    const pizzas = items
        .map((obj: any) => <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock {...obj}/></Link>)

    return (<>
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error'
                    ? <div>Произошла ошибка , не удалось получить пиццы</div>
                    : <div className="content__items">
                        {status === 'loading' ? skeletons : pizzas}
                    </div>
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    </>);
};

export default Home;