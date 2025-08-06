import React from 'react'
import { Link, NavLink } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch } from 'react-redux';
import { Avatar } from '@mui/material';
import { logout } from '../redux/reducers/UserSlice';
import FastfoodSharpIcon from '@mui/icons-material/FastfoodSharp';



const Navbar = ({ currentUser }) => {

    const dispatch = useDispatch();

    return (

        <div className="container position-relative d-flex align-items-center justify-content-between">
            <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">

                <h1 className="sitename mb-0 me-3">Foodeli </h1>
                <FastfoodSharpIcon style={{ fontSize: 28, color: '#ce1212' }}/>

            </Link>

            <nav id="navmenu" className="navmenu">
                <ul>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/home" >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dishes"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                            Dishes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/orders"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                            Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                            Contact
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/search" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>

                            <SearchIcon >

                            </SearchIcon>
                        </NavLink>
                    </li>
                    {currentUser ? (
                        <div className="d-flex align-items-center ms-auto gap-3">

                            <li>

                                <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                    <ShoppingCartIcon >
                                    </ShoppingCartIcon>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/favourite" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>

                                    <FavoriteBorderIcon >

                                    </FavoriteBorderIcon>
                                </NavLink>
                            </li>
                        </div>
                    ) : (
                        <>
                           
                        </>
                    )}



                </ul>


                <i className="mobile-nav-toggle d-xl-none bi bi-list" />
            </nav>
            {currentUser ? (


                <div className="user-controls d-flex align-items-center gap-3 ms-3">
                    <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
                    <button className="btn btn-danger" onClick={() => dispatch(logout())}>Logout</button>
                </div>

            ) : (
                <Link className="btn btn-danger" to="/">Sign In</Link>
            )}
        </div>


    )
}

export default Navbar
