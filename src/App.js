
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Order from './pages/Order';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FoodListing from './pages/FoodListing';
import Favourites from './pages/Favourites';
import Cart from './pages/Cart';
import { useSelector } from 'react-redux';
import FoodDetails from './pages/FoodDetails';
import useUIEffects from './hooks/useUIEffects';
import ErrorPage from './components/ErrorPage';

function App() {


  useUIEffects()
  const { currentUser } = useSelector((state) => state.user)
  const location = useLocation()
  const hideNavbarRoutes = ['/'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  // useEffect(() => {
  //   AOS.init({ duration: 1000 });

  //   if (location.pathname === "/") {
  //     document.body.classList.add("no-scroll");
  //   } else {
  //     document.body.classList.remove("no-scroll");
  //   }

  //   if (shouldShowNavbar) {
  //     const script = document.createElement("script");
  //     script.src = "./assets/js/main.js";
  //     script.defer = true;
  //     document.body.appendChild(script);

  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }


  // }, [shouldShowNavbar, location.pathname]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // if (location.pathname === "/") {
    //   document.body.classList.add("no-scroll");
    // } else {
    //   document.body.classList.remove("no-scroll");
    // }

    const isSigninPage = location.pathname === "/";

    document.body.classList.toggle("no-scroll", isSigninPage);

    return () => {
      document.body.classList.remove("no-scroll");
    };
    // if (shouldShowNavbar) {
    //   const script = document.createElement("script");
    //   script.src = "./assets/js/main.js";
    //   script.defer = true;
    //   document.body.appendChild(script);

    //   return () => {
    //     document.body.removeChild(script);
    //   };
    // }


  }, [shouldShowNavbar, location.pathname]);
  return (


    <div >
      {shouldShowNavbar && (
        <header id="header" className="header d-flex align-items-center sticky-top">
          <Navbar currentUser={currentUser} />
        </header>
      )}
      <main className='main'>

        <Routes>
          <Route path='/home' exact element={<Home />} />
          <Route path='/orders' exact element={<Order />} />
          <Route path='/dishes' exact element={<FoodListing />} />
          <Route path='/dishdetail/:id' element={<FoodDetails />} />
          <Route path='/contact' exact element={<Contact />} />
          <Route path='/favourite' exact element={<Favourites />} />
          <Route path='/cart' exact element={<Cart />} />
          <Route path='/' exact element={<SignIn />} />
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>


      </main>

    </div>
  );
}

export default App;
