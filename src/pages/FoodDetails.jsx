import { CircularProgress, Rating } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


const FoodDetails = () => {

    const [product, setProduct] = useState("")
    const { id } = useParams()
    const navigate = useNavigate();
    // const [favorite, setFavorite] = useState(false);
    // const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const getproduct = async () => {

        try {

            setLoading(true)
            const res = await axios.get("https://foodeli-backend-jk9x.onrender.com/foods/food/" + id)
            console.log(res.data)
            setProduct(res.data)
            setLoading(false)

        }
        catch (error) {
            // setError(true)
            console.log(error)
            toast.error(error.response.data.message);
            setLoading(false)
        }
    }

    //   const removeFavourite = async () => {
    //         setFavoriteLoading(true)
    //         try {

    //             const token = localStorage.getItem("foodeli-app-token")
    //             const res = await axios.patch("https://foodeli-backend-jk9x.onrender.com/users/favorite",
    //                 { productId: product?._id  },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`
    //                     }
    //                 }
    //             )
    //             console.log(res.data)
    //             setFavorite(false)
    //             setFavoriteLoading(false)
    //         } catch (error) {
    //             setFavoriteLoading(false)
    //             console.log(error)

    //         }
    //     }

    // const addFavourite = async () => {

    //     setFavoriteLoading(true)
    //     setLoading(true)
    //     const token = localStorage.getItem("foodeli-app-token")

    //     try {
    //         const res = await axios.post("https://foodeli-backend-jk9x.onrender.com/users/favorite",
    //             { id },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             }
    //         )
    //         console.log(res.data)
    //         setFavoriteLoading(false)
    //         setFavorite(true)
    //         setLoading(false)

    //     } catch (error) {
    //         console.log(error)
    //         alert("something went wrong !!")
    //     }

    // }

    const addCart = async () => {

        try {
            setCartLoading(true)
            const token = localStorage.getItem("foodeli-app-token")
            const productId = id;
            const res = await axios.post("https://foodeli-backend-jk9x.onrender.com/users/user/cart",
                { productId, quantity: 1 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setCartLoading(false)
            console.log(res.data)
            navigate("/cart")
            toast.success("🎉 Item Added to cart..");

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
            setLoading(false)
        }
    }

    useEffect(() => {

        getproduct()
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <Helmet>
                <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

                <link href="assets/img/favicon.png" rel="icon" />
                <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon"></link>

                <link href="https://fonts.googleapis.com" rel="preconnect" />
                <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Amatic+SC:wght@400;700&display=swap"
                    rel="stylesheet"></link>
                <link href="assets/css/main.css" rel="stylesheet" />



            </Helmet>


            <div className='container fd-container'>
                <div className="fd-wrapper">
                    {loading ? (

                        <CircularProgress></CircularProgress>
                    ) : (
                        <>

                            <div className="img-wrapper">
                                <img src={
                                    product.img
                                } alt="/" className="fd-image" />
                            </div>



                            <div className="fd-details">
                                <div>
                                    <div className="title">{product.name}</div>
                                </div>

                                <Rating value={3.5}></Rating>

                                <div className="price">
                                    ${product?.price?.org}
                                    <span className='pricing'>${product?.price?.mrp}</span>
                                    <div className="percent">
                                        {product?.price?.off}% off
                                    </div>
                                </div>

                                <div className="description">{product.desc}</div>

                                <div className="ingridents">
                                    Ingridents
                                    <div className="items">
                                        {product?.ingredients?.length === 0 ? (
                                            <>
                                                No ingridents to show
                                            </>
                                        ) :
                                            (product?.ingredients?.map((ingredient, index) => (
                                                <div key={index} className="item">{ingredient}</div>
                                            )))}

                                    </div>
                                </div>

                                <div className="btn-wrapper">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => addCart()}
                                        disabled={cartLoading}
                                    >
                                        {cartLoading ? "Loading..." : " Add to cart"}


                                    </button>

                                </div>
                            </div>
                        </>
                    )}

                </div>

            </div >
        </>
    )
}

export default FoodDetails;
