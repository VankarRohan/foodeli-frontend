import React from 'react'
// import { Link } from 'react-router-dom'

const ProductCategoryCard = ({ category }) => {
    return (

        <div className="category-card">

            <div className="top-menu">


                <img
                    src={category.img}
                    className="menu-img"
                    alt=""
                />

                <div className="categoryname">

                    <button className='categorybutton'>{category.name}</button>
                </div>


                <span className="badge text-bg-success sale-badge">{category.off}</span>


            </div>

        </div>




    )
}

export default ProductCategoryCard
