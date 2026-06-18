import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTrash, FaShoppingCart, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Message from './../../components/Message/Message'
import { addToCart, removeFromCart } from './../../actions/cartActions'
import Meta from '../../components/Helmet/Meta'

const Cart = ({ match, location, history }) => {

    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cartSeed = useSelector((state) => state.cartSeed)
    const { cartItems } = cartSeed

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
    const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Meta title="AgriConnect | Cart" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-8">
                    <FaShoppingCart className="text-3xl text-secondary mr-3" />
                    <h1 className="text-4xl font-extrabold text-gray-900">Shopping Cart</h1>
                </div>

                {cartItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-md p-16 text-center"
                    >
                        <FaShoppingCart className="text-7xl text-gray-200 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                        <Link to="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-secondary text-white font-bold px-8 py-3 rounded-full inline-flex items-center shadow-md hover:bg-green-700 transition-colors"
                            >
                                <FaArrowLeft className="mr-2" /> Go Shopping
                            </motion.button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.seed}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        layout
                                        className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 flex items-center gap-5"
                                    >
                                        {/* Image */}
                                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center p-1">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-grow min-w-0">
                                            <Link
                                                to={`/farmers/purchaseSeeds/${item.seed}`}
                                                className="text-gray-900 font-semibold text-lg hover:text-secondary transition-colors line-clamp-1"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-xl font-bold text-secondary mt-1">₹{item.price}</p>
                                        </div>

                                        {/* Quantity */}
                                        <div className="shrink-0">
                                            <select
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.seed, Number(e.target.value)))}
                                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="shrink-0 text-right min-w-[80px]">
                                            <p className="text-xs text-gray-400 mb-1">Subtotal</p>
                                            <p className="font-bold text-gray-900">₹{(item.price * item.qty).toFixed(2)}</p>
                                        </div>

                                        {/* Remove */}
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => removeFromCartHandler(item.seed)}
                                            className="shrink-0 p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors"
                                            title="Remove item"
                                        >
                                            <FaTrash />
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-28"
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Items ({totalItems})</span>
                                        <span className="font-semibold text-gray-900">₹{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-semibold">FREE</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-extrabold text-secondary">₹{totalPrice}</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                    className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
                                >
                                    Proceed To Checkout <FaArrowRight className="ml-2" />
                                </motion.button>

                                <Link to="/farmers/purchaseSeeds">
                                    <button className="w-full mt-3 border border-gray-200 text-gray-600 font-semibold py-3 px-6 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
                                        <FaArrowLeft className="mr-2" /> Continue Shopping
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
