import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaArrowLeft, FaMapMarkerAlt, FaStore } from 'react-icons/fa';

import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { listConsumerProductsDetails } from '../../actions/consumerProductAction.js'
import Meta from '../../components/Helmet/Meta';

const ConsumerProductDetailScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch()

    const consumerProductDetails = useSelector(state => state.consumerProductDetails)
    const { loading, error, consumerProduct } = consumerProductDetails || {}

    useEffect(() => {
        dispatch(listConsumerProductsDetails(match.params.id))
    }, [dispatch, match])

    const addtoCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <Meta title={consumerProduct?.prod_name ? `AgriConnect | ${consumerProduct.prod_name}` : "AgriConnect | Consumer Product"} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    to="/consumer"
                    className="inline-flex items-center text-primary hover:text-yellow-600 font-medium mb-8 transition-colors"
                >
                    <FaArrowLeft className="mr-2" /> GO BACK
                </Link>

                {
                    loading ?
                        <div className="flex justify-center my-12"><Loader /></div>
                        : error
                            ? <Message variant='danger'>{error}</Message>
                            : consumerProduct && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
                                        {/* Product Image */}
                                        <div className="lg:col-span-2 bg-yellow-50 p-8 flex items-center justify-center relative">
                                            <motion.img
                                                whileHover={{ scale: 1.05 }}
                                                src={consumerProduct.image}
                                                alt={consumerProduct.prod_name}
                                                className="w-full max-w-sm rounded-lg object-contain drop-shadow-xl"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-8 lg:col-span-2 flex flex-col justify-center">
                                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{consumerProduct.prod_name}</h1>

                                            <div className="text-3xl font-black text-yellow-600 mb-6">
                                                ₹{consumerProduct.price}
                                            </div>

                                            <div className="space-y-4 mb-6">
                                                <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <FaStore className="text-gray-400 mr-3 text-xl" />
                                                    <div>
                                                        <span className="block text-xs uppercase font-bold text-gray-500">Seller</span>
                                                        <span className="font-semibold text-gray-900">{consumerProduct.seller_name}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <FaMapMarkerAlt className="text-red-400 mr-3 text-xl" />
                                                    <div>
                                                        <span className="block text-xs uppercase font-bold text-gray-500">Available Location</span>
                                                        <span className="font-semibold text-gray-900">{consumerProduct.avalaible_location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Card */}
                                        <div className="p-8 bg-gray-50 border-l border-gray-100 flex flex-col justify-center lg:col-span-1">
                                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                                    <span className="text-gray-600">Price</span>
                                                    <span className="text-xl font-bold text-gray-900">₹{consumerProduct.price}</span>
                                                </div>

                                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                                    <span className="text-gray-600">Status</span>
                                                    <span className={`font-semibold ${consumerProduct.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                        {consumerProduct.quantity > 0 ? 'In Stock' : 'Out Of Stock'}
                                                    </span>
                                                </div>

                                                {consumerProduct.quantity > 0 && (
                                                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                                                        <span className="text-gray-600">Quantity</span>
                                                        <select
                                                            value={qty}
                                                            onChange={(e) => setQty(Number(e.target.value))}
                                                            className="w-20 px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                                        >
                                                            {[...Array(consumerProduct.quantity).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={addtoCartHandler}
                                                    disabled={consumerProduct.quantity === 0}
                                                    className={`w-full py-3 px-4 rounded-xl flex items-center justify-center font-bold text-white transition-colors ${consumerProduct.quantity === 0
                                                        ? 'bg-gray-400 cursor-not-allowed'
                                                        : 'bg-yellow-500 hover:bg-yellow-600 shadow-md hover:shadow-lg'
                                                        }`}
                                                >
                                                    <FaShoppingCart className="mr-2" /> Add To Cart
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                }
            </div>
        </div>
    )
}

export default ConsumerProductDetailScreen
