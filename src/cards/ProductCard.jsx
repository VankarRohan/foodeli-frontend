import React, { useEffect, useState } from 'react'
import { FavoriteBorder, FavoriteRounded, ShoppingBagOutlined } from '@mui/icons-material'
import { CircularProgress, Rating } from '@mui/material'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { openSnackbar } from '../redux/reducers/SnackbarSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(false)
    const [favoriteLoading, setFavoriteLoading] = useState(false)

    const addFavourite = async () => {
        setFavoriteLoading(true)
        try {
            const productId = product._id
            const token = localStorage.getItem("foodeli-app-token")
            const res = await axios.post("https://foodeli-backend-jk9x.onrender.com/users/favorite",
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(res.data)
            setFavorite(true)
            setFavoriteLoading(false)

            toast.success("🎉 Item added to favourites..");

        } catch (error) {

            setFavoriteLoading(false)
            console.log(error)

           toast.error(error.response.data.message);
        }
    }

    const removeFavourite = async () => {
        setFavoriteLoading(true)
        try {

            const token = localStorage.getItem("foodeli-app-token")
            const res = await axios.patch("https://foodeli-backend-jk9x.onrender.com/users/favorite",
                { productId: product?._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(res.data)
            setFavorite(false)
            setFavoriteLoading(false)
            // checkFavourite()

            toast.success("🎉 Item removed from favorites..");

        } catch (error) {
            setFavoriteLoading(false)
            console.log(error)

          toast.error(error.response.data.message);
        }
    }

    const addCart = async (id) => {

        try {
            const token = localStorage.getItem("foodeli-app-token")
            const productId = id
            const res = await axios.post("https://foodeli-backend-jk9x.onrender.com/users/user/cart",
                { productId, quantity: 1 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(res)
            toast.success('🎉 Item Added to cart..');
            // navigate("/cart")

        } catch (error) {
            console.log(error)
            dispatch(
                openSnackbar({
                    message: error.response.data.message,
                    severity: "error",
                })
            );
           toast.error(error.response.data.message);
        }

    }

    const checkFavourite = async () => {
        setFavoriteLoading(true)

        try {
            const token = localStorage.getItem("foodeli-app-token")
            const res = await axios.get("https://foodeli-backend-jk9x.onrender.com/users/favorite",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const favorites = res.data?.data;
            const isFavorite = favorites?.some(
                (favorite) => favorite._id === product?._id
            );
            setFavorite(isFavorite);

            setFavoriteLoading(false);

        } catch (error) {
            console.log(error)
            setFavoriteLoading(false);

        }
    }

    useEffect(() => {
        const token = localStorage.getItem("foodeli-app-token");
        if (token) {
            checkFavourite();
        }
        // eslint-disable-next-line
    }, [favorite])

    return (


        <div className="card">


            <div className="top-menu" onClick={(product_id) => navigate(`/dishdetail/${product?._id}`)}>

                <div className="glightbox"  >
                    <img
                        src={product?.img}
                        className="menu-img img-fluid"
                        alt=""
                    />
                </div>

                <div className="menu">
                    <div className="menu-items" onClick={() => (favorite ? removeFavourite() : addFavourite())}>

                        {favoriteLoading ? (
                            <>
                                <CircularProgress sx={{ fontSize: "20px" }}></CircularProgress>
                            </>
                        ) : (
                            <>
                                {favorite ? (
                                    <FavoriteRounded style={{ fontSize: "22px", color: "red" }}></FavoriteRounded>
                                ) : (
                                    <FavoriteBorder sx={{ fontSize: "22px" }} />

                                )}
                            </>
                        )}

                    </div>

                    <div className="menu-items" onClick={() => addCart(product?._id)}>
                        <ShoppingBagOutlined style={{ fontSize: "22px" }}></ShoppingBagOutlined>
                    </div>

                </div>

                <div className="rate">

                    <Rating value={3.5} style={{ fontSize: "14px" }}></Rating>
                </div>
            </div>

            <div className='food-details' onClick={(product_id) => navigate(`/dishdetail/${product?._id}`)}>
                <p className='food-title'>{product?.name}</p>
                <p className="ingredients">{product?.desc}</p>

                <p className="price">₹{product?.price?.org}

                    <span className='pricing'>
                        ₹{product?.price?.mrp}
                    </span>
                    <span className='percent'>
                        {product?.price?.off}% off
                    </span>
                </p>

            </div>

        </div>



    )
}

export default ProductCard
