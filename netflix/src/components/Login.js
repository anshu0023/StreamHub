import React, { useState } from 'react'
import Header from './Header';
import axios from "axios";
import { API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from '../redux/userSlice';


const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(store => store.app.isLoading);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  }
  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    if (isLogin) {
      //login
      const user = { email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user)); // Save to Redux + localStorage
          toast.success(res.data.message);
          navigate("/browse");
        }

      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      //register
      dispatch(setLoading(true));
      const user = { fullName, email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/register`, user, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if (res.data.success) {
          toast.success(res.data.message);
        }
        setIsLogin(true);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    }
    setFullName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img className='w-[100vw] h-[100vh] bg-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="banner" />
      </div>
      <form
        onSubmit={getInputData}
        className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[30%] xl:w-[25%] bg-black bg-opacity-80 p-6 md:p-8 rounded-md mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

      >
        <h1 className="text-3xl text-white mb-6 font-bold text-center">
          {isLogin ? "Login" : "Signup"}
        </h1>
        <div className="flex flex-col gap-4">
          {!isLogin && (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Full Name"
              className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none"
          />
          <button
            type="submit"
            className="bg-red-600 p-3 rounded text-white font-semibold hover:bg-red-700 transition"
          >
            {isLoading ? "Loading..." : isLogin ? "Login" : "Signup"}
          </button>
          <p className="text-white text-sm text-center">
            {isLogin ? "New to Netflix?" : "Already have an account?"}{" "}
            <span
              onClick={loginHandler}
              className="text-blue-500 cursor-pointer hover:underline ml-1"
            >
              {isLogin ? "Signup" : "Login"}
            </span>
          </p>
        </div>
      </form>

    </div>
  )
}

export default Login