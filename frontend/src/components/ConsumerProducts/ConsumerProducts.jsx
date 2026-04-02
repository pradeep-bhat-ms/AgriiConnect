import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ConsumerProducts = ({ _id, prod_name, image, price, avalaible_location, prod_size }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
        >
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col border border-gray-100 relative group">
                <div className="relative overflow-hidden h-56 bg-gray-50 flex items-center justify-center p-4">
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="object-cover w-full h-full drop-shadow-sm z-10 rounded"
                        src={image}
                        alt={prod_name}
                    />
                    {/* Decorative background shape */}
                    <div className="absolute w-32 h-32 bg-yellow-400/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                </div>

                <div className="p-5 flex flex-col flex-grow bg-white z-20">
                    <Link to={`/consumer/${_id}`} className="block mt-1 flex-grow mb-4">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight hover:text-yellow-500 transition-colors line-clamp-2">
                            {prod_name}
                        </h3>
                    </Link>

                    <div className="mb-4 text-sm text-gray-600 space-y-2">
                        <div>
                            <span className="font-semibold text-gray-800">Size: </span>
                            <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded text-xs ml-1">{prod_size}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-800">Location: </span>
                            <span className="text-gray-500 flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span className="truncate" title={avalaible_location}>{avalaible_location}</span>
                            </span>
                        </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="text-xl font-extrabold text-yellow-600">₹{price}</span>
                        <Link to={`/consumer/${_id}`}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-yellow-50 text-yellow-600 hover:bg-yellow-500 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                            >
                                Preview
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ConsumerProducts;
