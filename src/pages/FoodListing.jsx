import { CircularProgress, Slider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ProductCard from '../cards/ProductCard';
import { filter } from "../utils/data"
import axios from 'axios';
import { toast } from 'react-toastify';


const FoodListing = () => {

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedcategories, setSelectedCategories] = useState([])

    const getFilteredProductsData = async () => {
        setLoading(true)
        try {
            const query = `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}${selectedcategories.length > 0 ? `&categories=${selectedcategories.join(",")}` : ""
                }`;
            const res = await axios.get(`https://foodeli-backend-jk9x.onrender.com/foods/food?${query}`)
            setProducts(res.data);
            console.log(res.data)
            setLoading(false)

        } catch (error) {
            console.log(error)
         toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getFilteredProductsData();
        // eslint-disable-next-line 
    }, [priceRange, selectedcategories]);

    return (

        <>

            <div className='container filter-container'>

                <section className='filter-section'>
                    <div className="filter-menu">

                        {filter.map((filter) => (
                            <div className="filter-section-items">
                                <div className="filter-item-title">
                                    {filter.name}
                                </div>
                                {filter.value === "price" ? (
                                    <Slider
                                        aria-label="Price"
                                        defaultValue={priceRange}
                                        min={0}
                                        max={1000}
                                        valueLabelDisplay="auto"
                                        marks={[
                                            { value: 0, label: "₹0" },
                                            { value: 1000, label: "₹1000" },
                                        ]}
                                        onChange={(e, newValue) => setPriceRange(newValue)}

                                    ></Slider>
                                ) : filter.value === "category" ? (
                                    <div className='filter-item-name' >
                                        {filter.items.map((item) => (

                                            <label className={`selectable-name ${selectedcategories.includes(item) ? "selected" : ""}`}
                                                key={item}

                                                onClick={() =>
                                                    setSelectedCategories((prevCategories) =>
                                                        prevCategories.includes(item)
                                                            ? prevCategories.filter(
                                                                (category) => category !== item
                                                            )
                                                            : [...prevCategories, item]
                                                    )
                                                }
                                            >{item} </label>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>

                </section>

                <section className='product-section'>

                    <section id="menu" className="menu-section">

                        {/* <div className="container"> */}

                        <div className="tab-content" data-aos="fade-up" data-aos-delay={150}>
                            <div className="tab-pane fade active show" id="menu-starters">

                                <div style={{

                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",

                                }}>

                                    {loading ? (
                                        <CircularProgress></CircularProgress>
                                    ) : (
                                        <div className="row gy-5">
                                            {products.map((product) => {
                                                return (
                                                    <ProductCard key={products._id} product={product} />

                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </>
    )
}

export default FoodListing

