import React, { useEffect, useState } from 'react'
import ProductCard from '../cards/ProductCard'
import ProductCategoryCard from '../cards/ProductCategoryCard'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { category } from "../utils/data"
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'


const Home = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)


  const getProducts = async () => {

    try {
      setLoading(true)
      const res = await axios.get("https://foodeli-backend-jk9x.onrender.com/foods/popular")
      console.log(res.data)
      setProducts(res.data)
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

    <div className='menu-container'>


      <section id="hero" className="hero section light-background">
        <div className="container">
          <div className="row gy-4 justify-content-center justify-content-lg-between">
            <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">
                Enjoy Your Healthy
                <br />
                Delicious Food
              </h1>
              <p data-aos="fade-up" data-aos-delay={100}>
                We are team of talented designers making websites with Bootstrap
              </p>
              <div className="d-flex" data-aos="fade-up" data-aos-delay={200}>
                <Link to="/home" className="btn-get-started">
                  Booka a Table
                </Link>
                <Link
                  to="/home"
                  className="glightbox btn-watch-video d-flex align-items-center"
                >
                  <i className="bi bi-play-circle" />
                  <span>Watch Video</span>
                </Link>
              </div>
            </div>
            <div className="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out">
              <img
                src="assets/img/hero-img.png"
                className="img-fluid animated"
                alt="/home"
              />
            </div>
          </div>
        </div>
      </section>



      <section id="menu" className="menu-section">
        <div className="tab-content" data-aos="fade-up" data-aos-delay={200}>

          <div className="tab-pane fade active show" id="menu-starters">

            <div className="tab-header text-center">
              <h2 style={{ marginBottom: "25px" }}>Food Categories</h2>
            </div>

            <div className="menu-cardwrapper">
              {category.map((categoryItem) => (
                <ProductCategoryCard
                  key={categoryItem.id || categoryItem._id || categoryItem.name}
                  category={categoryItem}
                />
              ))}
            </div>
          </div>

        </div>

      </section>


      <section id="menu" className="menu-section">

        <div className="container section-title" data-aos="fade-up">
          {/* <h2>Favourites</h2> */}
          <p>
            <span>Check out the</span>{" "}
            <span className="description-title">Most Popular Food</span>
          </p>
        </div>

        <div className="tab-content" data-aos="fade-up" data-aos-delay={150}>
          <div className="tab-pane fade active show" id="menu-starters">
            <div style={{

              display: "flex",
              flexDirection: "column",
              alignItems: "center",

            }}></div>
            {loading ? (
              <CircularProgress></CircularProgress>
            ) : (
              <div className="menu-cardwrapper">
                {products.map((product) => {
                  return (
                    <ProductCard 
                     key={product.id || product._id || product.name} 
                    product={product} />

                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* </div> */}

      </section>


    </div>
  )
}

export default Home
