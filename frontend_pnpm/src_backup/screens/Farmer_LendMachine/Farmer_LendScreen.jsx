import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import LendMachines from './../../components/LendMachines/LendMachines';
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';

import { listLendMachineProducts } from './../../actions/productLendMachinesActions';
import Meta from '../../components/Helmet/Meta';

const Farmer_LendScreen = () => {
    const dispatch = useDispatch();

    const productLendMachinesList = useSelector(state => state.productLendMachinesList);
    const { loading, error, productLendMachines = [] } = productLendMachinesList || {};

    const [numberOfItems, setNumberOfItems] = useState(6);

    useEffect(() => {
        dispatch(listLendMachineProducts());
    }, [dispatch]);

    const showMore = () => {
        if (numberOfItems + 3 <= productLendMachines.length) {
            setNumberOfItems(numberOfItems + 3);
        } else {
            setNumberOfItems(productLendMachines.length);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Meta title="AgriConnect | Farmer Machines" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Available <span className="text-orange-500">Machines</span>
                        </h1>
                        <div className="w-24 h-1.5 bg-orange-500 mx-auto mb-8 rounded-full"></div>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Rent state-of-the-art farming machinery and tractors at affordable rates to boost your agricultural productivity.
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
                            {productLendMachines && productLendMachines
                                .slice(0, numberOfItems)
                                .map((machine, index) => (
                                    <LendMachines
                                        key={machine._id}
                                        _id={machine._id}
                                        name={machine.name}
                                        image={machine.image}
                                        targetPlant={machine.target_plant}
                                        price={machine.price}
                                        quantity={machine.quantity}
                                    />
                                ))}
                        </div>

                        <div className="mt-12 text-center flex flex-col items-center">
                            {productLendMachines && numberOfItems >= productLendMachines.length ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-orange-100 text-orange-800 px-6 py-3 rounded-full font-medium shadow-sm mb-6"
                                >
                                    You've reached the end of the catalog
                                </motion.div>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={showMore}
                                    className="bg-orange-500 text-white hover:bg-orange-600 px-8 py-3 rounded-full font-bold shadow-md transition-colors"
                                >
                                    Load More Machines
                                </motion.button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Farmer_LendScreen;
