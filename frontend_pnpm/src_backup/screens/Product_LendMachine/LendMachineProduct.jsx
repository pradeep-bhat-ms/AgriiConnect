import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaArrowLeft, FaTractor } from 'react-icons/fa';
import { listLendMachineProductsDetails } from './../../actions/productLendMachinesActions'
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import Meta from '../../components/Helmet/Meta';

const LendMachineProduct = ({ history, match }) => {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch()

    const productLendMachinesDetails = useSelector(state => state.productLendMachinesDetails)
    const { loading, error, productLendMachines } = productLendMachinesDetails || {}

    useEffect(() => {
        dispatch(listLendMachineProductsDetails(match.params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, match])

    const addtoCartHandler = () => {
        history.push(`/cart/machine-${match.params.id}?qty=${qty}`)
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <Meta title={productLendMachines?.name ? `AgriConnect | ${productLendMachines.name}` : "AgriConnect | Machine"} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    to="/farmers/lendMachines"
                    className="inline-flex items-center text-primary hover:text-orange-500 font-medium mb-8 transition-colors"
                >
                    <FaArrowLeft className="mr-2" /> GO BACK
                </Link>
                {
                    loading
                        ? <div className="flex justify-center my-12"><Loader /></div>
                        : error
                            ? <Message variant='danger'>{error}</Message>
                            : productLendMachines && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
                                        {/* Product Image */}
                                        <div className="lg:col-span-2 bg-gray-100 p-8 flex items-center justify-center relative">
                                            <div className="absolute top-4 left-4 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-sm">
                                                <FaTractor className="mr-2" /> Rental
                                            </div>
                                            <motion.img
                                                whileHover={{ scale: 1.05 }}
                                                src={productLendMachines.image}
                                                alt={productLendMachines.name}
                                                className="w-full max-w-sm rounded-lg object-contain drop-shadow-lg"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-8 lg:col-span-2 flex flex-col justify-center">
                                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{productLendMachines.name}</h1>

                                            <div className="text-3xl font-black text-primary mb-6">
                                                ₹{productLendMachines.price} <span className="text-lg text-gray-400 font-normal">/ day</span>
                                            </div>

                                            <div className="mb-6 bg-orange-50 p-4 rounded-xl border border-orange-100">
                                                <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                                                <p className="text-gray-700 leading-relaxed text-sm">
                                                    {productLendMachines.description}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Machine Power</span>
                                                    <span className="font-semibold text-gray-900">{productLendMachines.machine_power}</span>
                                                </div>
                                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Target Plant</span>
                                                    <span className="font-semibold text-gray-900">{productLendMachines.target_plant}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Card */}
                                        <div className="p-8 bg-gray-50 border-l border-gray-100 flex flex-col justify-center lg:col-span-1">
                                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                                    <span className="text-gray-600">Rate</span>
                                                    <span className="text-xl font-bold text-gray-900">₹{productLendMachines.price}</span>
                                                </div>

                                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                                    <span className="text-gray-600">Availability</span>
                                                    <span className={`font-semibold ${productLendMachines.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                        {productLendMachines.quantity > 0 ? `${productLendMachines.quantity} Available` : 'Not Available'}
                                                    </span>
                                                </div>

                                                {productLendMachines.quantity > 0 && (
                                                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                                                        <span className="text-gray-600">Days</span>
                                                        <select
                                                            value={qty}
                                                            onChange={(e) => setQty(Number(e.target.value))}
                                                            className="w-20 px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                                                        >
                                                            {[...Array(productLendMachines.quantity).keys()].map((x) => (
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
                                                    disabled={productLendMachines.quantity === 0}
                                                    className={`w-full py-3 px-4 rounded-xl flex items-center justify-center font-bold text-white transition-colors ${productLendMachines.quantity === 0
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-primary hover:bg-gray-800 shadow-md hover:shadow-lg'
                                                        }`}
                                                >
                                                    <FaShoppingCart className="mr-2" /> Book Now
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

export default LendMachineProduct
