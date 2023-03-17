import React from 'react';
import {useParams} from "react-router-dom";

const FullPizza = () => {

    const {id} = useParams()

    return (
        <div className={'container'}>
            <img src="" alt="nety(("/>
            <h2>{id}</h2>
            <p>Jorno javanna</p>
            <h4>250 ₴</h4>
        </div>
    );
};

export default FullPizza;