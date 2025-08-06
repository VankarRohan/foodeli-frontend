
import React, { useEffect, useState } from 'react'
import TextInput from '../components/TextInput'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'
import { toast } from 'react-toastify'


const Cart = () => {
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [products, setProducts] = useState([])
    const [buttonLoad, setButtonLoad] = useState(false)
    const [deliveryDetails, setDeliveryDetails] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        completeAddress: "",
    });

    const getProducts = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem("foodeli-app-token")
            const res = await axios.get("https://foodeli-backend-jk9x.onrender.com/users/cart", {
                headers: { Authorization: `Bearer ${token}` },
            })
            setLoading(false)
            console.log(res.data)
            setProducts(res.data)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    const addCart = async (id) => {

        try {
            setLoading(true)
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
            setLoading(false)
            getProducts()
            toast.success("🎉 Item Added to cart..");

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }

    }

    const removeCart = async (id, quantity, type) => {
        setLoading(true)
        try {
            const token = localStorage.getItem("foodeli-app-token")
            let qnt = quantity > 0 ? 1 : null;
            if (type === "full") qnt = null;
            const res = await axios.patch("https://foodeli-backend-jk9x.onrender.com/users/cart",
                {
                    productId: id,
                    quantity: qnt
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
            console.log(res)
            setLoading(false)

            setReload(!reload)
            toast.success("🎉 Item Removed from cart..");

        } catch (error) {
            setReload(!reload)
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message);
        }
    }

    const calculateSubtotal = () => {

        return products.reduce(
            (total, item) => total + item.quantity * item?.product?.price?.org,
            0
        );
    }

    const placeOrder = async () => {
        // setLoading(true)
        setButtonLoad(true)
        try {
            const isDeliveryDetailsFilled =
                deliveryDetails.firstName &&
                deliveryDetails.lastName &&
                deliveryDetails.completeAddress &&
                deliveryDetails.phoneNumber &&
                deliveryDetails.emailAddress;

            if (!isDeliveryDetailsFilled) {
                // alert("Please fill in all required delivery details..")
                toast.error("Please fill in all required delivery details..");

                // setLoading(false);
                setButtonLoad(false);
                return;
            }
            const token = localStorage.getItem("foodeli-app-token")
            const totalAmount = calculateSubtotal().toFixed(2)

            const orderDetails = {
                products,
                address: {
                    firstName: deliveryDetails.firstName,
                    lastName: deliveryDetails.lastName,
                    completeAddress: deliveryDetails.completeAddress,
                    phoneNumber: deliveryDetails.phoneNumber,
                    emailAddress: deliveryDetails.emailAddress,
                },
                totalAmount,
            };
            const res = await axios.post("https://foodeli-backend-jk9x.onrender.com/users/order", orderDetails, {

                headers: { Authorization: `Bearer ${token}` },
            })
            console.log(res)
            // window.alert("order placed...")
            setLoading(false)
            toast.success("🎉 Order placed successfully..");

            setButtonLoad(false);
            // Clear the cart and update the UI
            setReload(!reload);


        } catch (error) {
            setButtonLoad(false);
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message);
        }
    }



    useEffect(() => {
        getProducts();
    }, [reload]);

    return (
        <div className='container cart-container'>
            <section className='cart-section'>
                <div className="section-title">Your shopping cart
                </div>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {products.length === 0 ? (
                            <>Cart is empty</>
                        ) : (

                            <div className="cart-wrapper">
                                <div className="left-wrapper">
                                    <table class="table">
                                        <thead>
                                            <tr>


                                                <th className='table-item bold flex' >Product</th>
                                                <th className='table-item bold' >Price</th>
                                                <th className='table-item bold' >Quantity</th>
                                                <th className='table-item bold' >Subtotal</th>
                                                <th className='table-item bold' >Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {products.map((item) => (
                                                <tr>


                                                    <td className='table-item flex'>
                                                        <div className="product">
                                                            <img src={item?.product?.img} className='product-img' alt="Product" />
                                                            <div className="product-details">
                                                                <div className="product-title">{item?.product?.name}</div>
                                                                <div className="product-desc">{item?.product?.desc}</div>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='table-item'>{item?.product?.price?.org}</td>
                                                    <td className="table-item">
                                                        <div className="quantity-control">
                                                            <button className="qty-btn" onClick={() => removeCart(item?.product?._id, item?.quantity - 1)}>-</button>
                                                            <span className="qty-value">{item?.quantity}</span>
                                                            <button className="qty-btn" onClick={() => addCart(item?.product?._id)}>+</button>
                                                        </div>
                                                    </td>
                                                    <td className='table-item'>          {" "}
                                                        ₹
                                                        {(item.quantity * item?.product?.price?.org).toFixed(2)}
                                                    </td>
                                                    <td className='table-item'>         <DeleteOutline
                                                        sx={{ color: "red" }}
                                                        onClick={() =>
                                                            removeCart(
                                                                item?.product?._id,
                                                                item?.quantity - 1,
                                                                "full"
                                                            )
                                                        }

                                                    />
                                                    </td>
                                                </tr>

                                            ))}
                                        </tbody>
                                    </table>

                                </div>

                                <div className="right-wrapper">

                                    <span className="subtotal">
                                        Subtotal : ₹{calculateSubtotal()}

                                    </span>

                                    <div className="delivery">Deliverydetails:
                                        <div>
                                            <div style={{
                                                display: "flex",
                                                gap: "6px"
                                            }}>
                                                <TextInput small placeholder='First Name'
                                                    value={deliveryDetails.firstName}
                                                    handelChange={(e) =>
                                                        setDeliveryDetails({
                                                            ...deliveryDetails,
                                                            firstName: e.target.value,
                                                        })
                                                    }
                                                />
                                                <TextInput small placeholder='Last Name'
                                                    value={deliveryDetails.lastName}
                                                    handelChange={(e) =>
                                                        setDeliveryDetails({
                                                            ...deliveryDetails,
                                                            lastName: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <TextInput small placeholder='Email Address'
                                                value={deliveryDetails.emailAddress}
                                                handelChange={(e) =>
                                                    setDeliveryDetails({
                                                        ...deliveryDetails,
                                                        emailAddress: e.target.value,
                                                    })
                                                }
                                            />
                                            <TextInput small placeholder="Phone no. +91 XXXXX XXXXX"
                                                value={deliveryDetails.phoneNumber}
                                                handelChange={(e) =>
                                                    setDeliveryDetails({
                                                        ...deliveryDetails,
                                                        phoneNumber: e.target.value,
                                                    })
                                                }
                                            ></TextInput>
                                            <TextInput small textArea rows="5"
                                                placeholder="Complete Address (Address, State, Country, Pincode)"
                                                value={deliveryDetails.completeAddress}
                                                handelChange={(e) =>
                                                    setDeliveryDetails({
                                                        ...deliveryDetails,
                                                        completeAddress: e.target.value,
                                                    })
                                                }
                                            ></TextInput>

                                        </div>
                                    </div>

                                    <div className="delivery">PaymentDetails:
                                        <div>
                                            <div style={{
                                                display: "flex",
                                                gap: "6px"
                                            }}>
                                                <TextInput small placeholder="Expiry Date"></TextInput>
                                                <TextInput small placeholder="CVV"></TextInput>

                                            </div>
                                            <TextInput small placeholder="Card Holder's Name"></TextInput>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => placeOrder()}
                                        isLoading={buttonLoad}
                                        isDisabled={buttonLoad}
                                    >
                                        {buttonLoad ? "Loading..." : "Place Order"}
                                    </button>
                                </div>
                            </div>

                        )}
                    </>
                )}
            </section>
        </div>

    )
}

export default Cart
