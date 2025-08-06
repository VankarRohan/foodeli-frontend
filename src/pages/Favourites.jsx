import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import ProductCard from '../cards/ProductCard';
import { toast } from 'react-toastify';

const Favourites = () => {

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    setLoading(true)

    try {

      const token = localStorage.getItem("foodeli-app-token")

      const res = await axios.get("https://foodeli-backend-jk9x.onrender.com/users/favorite", {
        headers: { Authorization: `Bearer ${token}` },
      })

      setProducts(res.data.data)
      setLoading(false)

    } catch (error) {
      console.log(error)
     toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <section id="menu" className="menu-section">

      <div className="container section-title" data-aos="fade-up">

        <p>
          <span>Check out</span>{" "}
          <span className="description-title">Your Favourites</span>
        </p>
      </div>

      <div className="container">

        <div className="tab-content" data-aos="fade-up" data-aos-delay={150}>
          <div className="tab-pane fade active show" id="menu-starters">
            <div style={{

              display: "flex",
              flexDirection: "column",
              alignItems: "center",

            }}>
              {loading ? (
                <CircularProgress />
              ) : (

                <>
                  {products.length === 0 ? (
                    <div className='no-orders'>No favourites !!</div>
                  ) : (
                    <div className='menu-cardwrapper'>
                      {products.map((product) => (
                        <ProductCard product={product} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Favourites
