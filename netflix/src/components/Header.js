import React, { useState, useEffect } from 'react';
import { IoIosArrowDropdown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { setUser } from '../redux/userSlice';
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';

const Header = () => {
    const user = useSelector((store) => store.app.user);
    const toggle = useSelector(store => store.movie.toggle);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        setShowDropdown(false);
    }, [toggle, location.pathname]);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            if (res.data.success) {
                toast.success(res.data.message);
            }
            dispatch(setUser(null));
            navigate("/signup");
        } catch (error) {
            console.log(error);
        }
    };

    const toggleHandler = () => {
        dispatch(setToggle());
    };

    const handleLogoClick = () => {
        if (user) {
            if (location.pathname === "/browse") {
                window.location.reload();
            } else {
                navigate("/browse");
            }
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className='absolute z-10 flex w-full items-center justify-between px-6 py-3 bg-gradient-to-b from-black'>
            <img
                onClick={(e) => {
                    if (user) {
                        handleLogoClick();
                    } else {
                        e.preventDefault(); // do nothing if not logged in
                    }
                }}
                className="w-56 cursor-pointer"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
                alt="Netflix_logo"
            />


            {user && (
                <div className='flex items-center gap-4'>
                    <button
                        onClick={toggleHandler}
                        className='flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded'
                    >
                        {!toggle && <FaSearch />}
                        <span className='text-sm'>{toggle ? "Home" : "Search Movie"}</span>
                    </button>

                    <div className='relative'>
                        <div
                            onClick={() => setShowDropdown(!showDropdown)}
                            className='flex items-center gap-2 cursor-pointer text-white'
                        >
                            <IoIosArrowDropdown size="24px" />
                            <h1 className='text-lg font-medium'>{user.fullName}</h1>
                        </div>

                        {showDropdown && (
                            <div className='absolute right-0 mt-2 bg-white shadow-lg rounded px-4 py-2 z-20'>
                                <button
                                    onClick={logoutHandler}
                                    className='text-black hover:underline'
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
