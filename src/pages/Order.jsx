import { CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
// import ProductCard from '../cards/ProductCard'

const Order = () => {
  const [loading, setLoading] = useState(false)
  // const [orders, setorders] = useState([])
  const [orders, setOrders] = useState([])

  const getAllOrders = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("foodeli-app-token");

      const res = await axios.get("https://foodeli-backend-jk9x.onrender.com/users/order", {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(res.data.orders)
      setOrders(res.data.orders)
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }


  }
  useEffect(() => {
    getAllOrders()
  }, [])
  return (
    <section id="menu" className="menu-section">

      <div className="container section-title" data-aos="fade-up">

        <p>
          <span>Check out</span>{" "}
          <span className="description-title">Your Orders</span>
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
                  {orders.length === 0 ? (
                    <div className='no-orders' >No orders yet...</div>
                  ) : (

                    <>

                      {
                        orders.map((order) => (
                          <div className='order-container'>
                            <div className="order-box">


                              <div className="order-summary">

                                <h2>Order Summary</h2>
                                <p><strong>Customer:</strong>{order.address.firstName}{" "}{order.address.lastName} </p>
                                <p><strong>Address:</strong>  {order.address.completeAddress}</p>
                                <p><strong>Final Amount:</strong> ₹{order.total_amount}</p>
                                <p><strong>Payment Status:</strong> ✅ {order.status}</p>

                              </div>


                              <div>

                                {
                                  loading ? (
                                    <CircularProgress></CircularProgress>
                                  ) : (
                                    <div className='order-items'>

                                      {order?.products.map((item, index) => (


                                        <div className="order-item">
                                          <img src={item?.product?.img} alt="Food" className="order-img" />
                                          <div className="order-details">
                                            <h4>{item?.product?.name}</h4>
                                            <p>{item?.product?.desc}</p>
                                            <p className="dis">Price : ₹{item?.product?.price?.org}, Quantity : {item?.quantity} <br /> Total = ₹{item?.product?.price?.org * item?.quantity}</p>
                                          </div>
                                        </div>



                                      ))}


                                    </div>
                                  )
                                }
                              </div>
                            </div>

                          </div>
                        ))
                      }
                    </>
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

export default Order
