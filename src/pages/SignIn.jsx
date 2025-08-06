import { useEffect, useState } from 'react'
import "./signin.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../redux/reducers/UserSlice";
import { toast } from 'react-toastify';

const SignIn = () => {


    const {
        register: registerSignup,
        handleSubmit: handleSignupSubmit,

    } = useForm();

    const {
        register: registerSignin,
        handleSubmit: handleSigninSubmit,
    } = useForm();

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch();



    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        const handleSignUp = () => container.classList.add("right-panel-active");
        const handleSignIn = () => container.classList.remove("right-panel-active");

        signUpButton.addEventListener('click', handleSignUp);
        signInButton.addEventListener('click', handleSignIn);

        // Clean up the event listeners on unmount
        return () => {
            signUpButton.removeEventListener('click', handleSignUp);
            signInButton.removeEventListener('click', handleSignIn);
        };
    }, []);

    const SignInsubmitHandler = async (data) => {

        console.log(data)
        try {
            setLoading(true)
            const res = await axios.post("https://foodeli-backend-jk9x.onrender.com/users/user/login", data)
            console.log(res.data)
            dispatch(loginSuccess(res.data));

            toast.success('🎉 Login Successful..');
            setLoading(false)
            navigate("/home")

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
            setLoading(false)
        }
    }

    const SignupsubmitHandler = async (data) => {

        console.log(data)
        try {
            setLoading(true)
            const res = await axios.post("https://foodeli-backend-jk9x.onrender.com/users/user", data)
            console.log(res.data)
            toast.success('🎉 Account created successfully...please get logged in..');
            setLoading(false)

        } catch (error) {

            console.log(error)
            toast.error(error.response.data.message);
            setLoading(false)
        }
    }



    return (
        <>


            <div className='auth-page'>
                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form onSubmit={handleSignupSubmit(SignupsubmitHandler)} >
                            <h1>Create Account</h1>

                            <span className='my-4'>Please create account for logging in...</span>
                            {/* <label htmlFor="email">Enter email</label> */}
                            <input type="text" className='my-3' {...registerSignup("name")} placeholder="Enter your full name.." />
                            <input type="email" className='my-3' {...registerSignup("email")} placeholder="Please enter your email.." />
                            <input type="password" className='my-3' {...registerSignup("password")} placeholder="Please enter your password.." />

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-danger my-3"
                                >
                                    {loading ? "Loading..." : "Sign up"}
                                </button>


                            </div>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleSigninSubmit(SignInsubmitHandler)}>
                            <h1>Sign in</h1>

                            <span className='my-4'>Please login with your details...</span>
                            <input type="email" className='my-3' {...registerSignin("email")} placeholder="Please enter your email.." />
                            <input type="password" className='my-3' {...registerSignin("password")} placeholder="Please enter your password.." />
                            <a href="/">Forgot password?</a>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-danger my-3"
                                >
                                    {loading ? "Loading..." : "Sign In"}
                                </button>


                            </div>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn">
                                    Sign In
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Don't have an account....Create one tapping below button</p>

                                <button className="ghost" id="signUp">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    );
}

export default SignIn
