import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number,
    }>()

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://63ecde4fbe929df00cb3e18d.mockapi.io/items/${id}`)
                setPizza(data)
            } catch (error) {
                alert('ошибки при получении пиццы')
                navigate('/')
            }
        }

        fetchPizza().then()
    }, [id, navigate])

    if (!pizza) {
        return <>'Загрузка ...'</>
    }

    return (
        <div className={'container'}>
            <img srcSet={pizza.imageUrl} alt="pizza"/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₴</h4>
        </div>
    );
};

export default FullPizza;