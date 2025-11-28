import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaCogs } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import axios from 'axios';
import SearchBox from './SearchBox';
import { FaShoppingBag } from 'react-icons/fa';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [showAdmin, setShowAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.post('/api/users/logout');
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-4">
          {/* Icon */}
          <div className="bg-white text-black p-2 rounded-full">
            <FaShoppingBag />
          </div>
          {/* Text */}
          <span className="text-2xl font-bold tracking-tighter hover:text-gray-300 transition-colors">
            ShopVerse
          </span>
        </Link>

        {/* Search Box - Hidden on very small screens, visible on md+ */}
        <div className="hidden md:block flex-1 max-w-lg mx-auto">
          <SearchBox />
        </div>

        <nav className="flex items-center gap-6">
          <Link to="/cart" className="flex items-center gap-2 hover:text-blue-400 transition-colors relative">
            <FaShoppingCart className="text-lg" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
            <span className="hidden sm:block font-medium">Cart</span>
          </Link>

          {userInfo ? (
            <div className="flex items-center gap-6">

              {/* ADMIN MENU */}
              {userInfo.isAdmin && (
                <div className="relative">
                  <button
                    onClick={() => setShowAdmin(!showAdmin)}
                    className="flex items-center gap-1 hover:text-blue-400 font-bold"
                  >
                    Admin <FaCogs />
                  </button>
                  {/* Dropdown Content */}
                  {showAdmin && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800 border border-gray-200">
                      <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowAdmin(false)}>Products</Link>
                      <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowAdmin(false)}>Users</Link>
                      <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowAdmin(false)}>Orders</Link>
                    </div>
                  )}
                </div>
              )}

              <span className="font-bold text-blue-400">Hi, {userInfo.name}</span>
              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 hover:text-red-400 transition-colors"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <FaUser className="text-lg" />
              <span className="hidden sm:block font-medium">Sign In</span>
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Header;