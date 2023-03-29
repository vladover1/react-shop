import React from "react";

type CategoryProps = {
    categoryId: number
    onChangeCategory: (index: number) => void
}

const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
]

const Categories: React.FC<CategoryProps> = ({categoryId, onChangeCategory}) => {

    return (
        <div className="categories">
            <ul>
                {categories.map((value, index) => {
                    return <li key={index} onClick={() => onChangeCategory(index)}
                               className={categoryId === index ? 'active' : ''}>{value}</li>
                })}
            </ul>
        </div>
    )
}

export default Categories