import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Rating from '../Rating/Rating';

const PurchaseSeeds = ({ _id, name, rating, image, reviews, price }) => {
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
                        className="object-contain max-h-48 drop-shadow-md z-10"
                        src={image}
                        alt={name}
                    />
                    {/* Decorative background shape */}
                    <div className="absolute w-32 h-32 bg-secondary/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                </div>

                <div className="p-5 flex flex-col flex-grow bg-white z-20">
                    <div className="mb-2">
                        <Rating
                            value={rating}
                            text={`${reviews} reviews`}
                        />
                    </div>

                    <Link to={`/farmers/purchaseSeeds/${_id}`} className="block mt-1 flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight hover:text-secondary transition-colors line-clamp-2">
                            {name}
                        </h3>
                    </Link>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="text-xl font-extrabold text-primary">₹{price}</span>
                        <Link to={`/farmers/purchaseSeeds/${_id}`}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                            >
                                Preview
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default PurchaseSeeds;
