import React from "react";

type CategoryProps = {
    categoryId: number
    onChangeCategory: any
}

const Categories: React.FC<CategoryProps> = ({categoryId, onChangeCategory}) => {

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    return (
        <div className="categories">
            <ul>
                {categories.map((value, index) => {
                  return <li key={index} onClick={() => onChangeCategory(index)} className={categoryId === index ? 'active' : ''}>{value}</li>
                })}
            </ul>
        </div>
    )
}

export default Categories