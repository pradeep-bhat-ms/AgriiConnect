import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import PurchaseSeeds from '../../components/PurchaseSeeds/PurchaseSeeds';
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';

import { listSeedProducts } from './../../actions/productSeedActions';
import Meta from '../../components/Helmet/Meta';

const Farmer_ProductSeedScreen = () => {
    const dispatch = useDispatch();

    const productSeedList = useSelector(state => state.productSeedList);
    const { loading, error, productSeeds = [] } = productSeedList;

    const [numberOfItems, setNumberOfItems] = useState(6);

    useEffect(() => {
        dispatch(listSeedProducts());
    }, [dispatch]);

    const showMore = () => {
        if (numberOfItems + 3 <= productSeeds.length) {
            setNumberOfItems(numberOfItems + 3);
        } else {
            setNumberOfItems(productSeeds.length);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Meta title="AgriConnect | Farmer Seeds" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Latest <span className="text-secondary">Seeds & Fertilizers</span>
                        </h1>
                        <div className="w-24 h-1.5 bg-secondary mx-auto mb-8 rounded-full"></div>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Explore our wide range of high-quality seeds, proven pesticides, and organic fertilizers perfect for your farming needs.
                        </p>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="flex justify-center my-12"><Loader /></div>
                ) : error ? (
                    <div className="max-w-3xl mx-auto mt-8"><Message variant="danger">{error}</Message></div>
                ) : (
                    <div className="mt-8">
                        <div className="flex flex-wrap -mx-4">
                            {productSeeds
                                .slice(0, numberOfItems)
                                .map((seed, index) => (
                                    <PurchaseSeeds
                                        key={seed._id}
                                        _id={seed._id}
                                        name={seed.name}
                                        image={seed.image}
                                        rating={seed.rating}
                                        reviews={seed.numReviews}
                                        price={seed.price}
                                    />
                                ))}
                        </div>

                        <div className="mt-12 text-center flex flex-col items-center">
                            {productSeeds && numberOfItems >= productSeeds.length ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-green-100 text-green-800 px-6 py-3 rounded-full font-medium shadow-sm mb-6"
                                >
                                    You've reached the end of the catalog
                                </motion.div>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={showMore}
                                    className="bg-secondary text-white hover:bg-green-700 px-8 py-3 rounded-full font-bold shadow-md transition-colors"
                                >
                                    Load More Products
                                </motion.button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Farmer_ProductSeedScreen;
