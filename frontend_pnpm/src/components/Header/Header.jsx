import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaShoppingCart, FaUser, FaChevronDown } from 'react-icons/fa';
import { logout } from './../../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState('');

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
    setDropdownOpen('');
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'FARMER', path: '/farmer' },
    { name: 'CONSUMER', path: '/consumer' },
    { name: 'SUPPLIER', path: '/login?redirect=supplier' },
  ];

  const handleDropdown = (menu) => {
    if (dropdownOpen === menu) {
      setDropdownOpen('');
    } else {
      setDropdownOpen(menu);
    }
  };

  return (
    <nav className="bg-primary shadow-lg fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <motion.img
                whileHover={{ scale: 1.05 }}
                className="h-16 w-auto"
                src="/Logo.png"
                alt="AgriConnect Logo"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-200 hover:text-accent px-3 py-2 rounded-md text-sm font-medium tracking-wide transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/cart"
              className="text-gray-200 hover:text-accent flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <FaShoppingCart className="mr-2" /> CART
            </Link>

            {/* User Dropdown */}
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={() => handleDropdown('user')}
                  className="flex items-center text-gray-200 hover:text-accent focus:outline-none px-3 py-2 text-sm font-medium transition-colors uppercase"
                >
                  <FaUser className="mr-2" /> {userInfo.name.split(' ')[0]} <FaChevronDown className="ml-1 text-xs" />
                </button>
                <AnimatePresence>
                  {dropdownOpen === 'user' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1"
                    >
                      {userInfo.isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen('')}
                        >
                          DASHBOARD
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen('')}
                      >
                        PROFILE
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        LOGOUT
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-secondary text-white hover:bg-green-600 px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                SIGN IN
              </Link>
            )}

            {/* Admin Dropdown */}
            {userInfo && userInfo.isAdmin && (
              <div className="relative">
                <button
                  onClick={() => handleDropdown('admin')}
                  className="flex items-center text-gray-200 hover:text-accent focus:outline-none px-3 py-2 text-sm font-medium transition-colors uppercase"
                >
                  ADMIN <FaChevronDown className="ml-1 text-xs" />
                </button>
                <AnimatePresence>
                  {dropdownOpen === 'admin' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1"
                    >
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen('')}
                      >
                        USERS
                      </Link>
                      <Link
                        to="/admin/productlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen('')}
                      >
                        PRODUCTS
                      </Link>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen('')}
                      >
                        ORDERS
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-white focus:outline-none"
            >
              {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-primary overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-200 hover:text-accent block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/cart"
                className="text-gray-200 hover:text-accent block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <FaShoppingCart className="mr-2" /> CART
                </div>
              </Link>

              {!userInfo && (
                <Link
                  to="/login"
                  className="text-secondary font-bold block px-3 py-2 rounded-md text-base"
                  onClick={() => setIsOpen(false)}
                >
                  SIGN IN
                </Link>
              )}

              {userInfo && (
                <>
                  <div className="border-t border-gray-700 pt-4 pb-2">
                    <div className="text-accent px-3 text-sm font-semibold uppercase">{userInfo.name}</div>
                    {userInfo.isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        DASHBOARD
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      PROFILE
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="text-red-400 hover:text-red-300 block w-full text-left px-3 py-2 text-base font-medium"
                    >
                      LOGOUT
                    </button>
                  </div>
                </>
              )}

              {userInfo && userInfo.isAdmin && (
                <div className="border-t border-gray-700 pt-4 pb-2">
                  <div className="text-gray-400 px-3 text-sm font-semibold">ADMIN</div>
                  <Link
                    to="/admin/userlist"
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    USERS
                  </Link>
                  <Link
                    to="/admin/productlist"
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    PRODUCTS
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    ORDERS
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
