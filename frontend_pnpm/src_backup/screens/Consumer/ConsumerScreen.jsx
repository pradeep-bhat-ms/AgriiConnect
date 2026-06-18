import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Row,
    Button,
    Alert
} from 'react-bootstrap';
import { motion } from 'framer-motion';
import ConsumerProducts from './../../components/ConsumerProducts/ConsumerProducts'
import { listConsumerProducts } from './../../actions/consumerProductAction.js'
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';
import Meta from '../../components/Helmet/Meta';

const ConsumerScreen = () => {

    const dispatch = useDispatch();

    const consumerProductList = useSelector(state => state.consumerProductList)
    const { loading, consumerProducts, error } = consumerProductList

    const [numberOfItems, setNumberOfItems] = useState(3);

    useEffect(() => {
        dispatch(listConsumerProducts())
    }, [dispatch])

    const showMore = () => {
        if (numberOfItems + 3 <= consumerProducts?.length) {
            setNumberOfItems(numberOfItems + 3)
        } else {
            setNumberOfItems(consumerProducts?.length || 0)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Meta title="AgriConnect | Consumer" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Welcome, <span className="text-yellow-600">Consumer</span>
                        </h1>
                        <div className="w-24 h-1.5 bg-yellow-500 mx-auto mb-8 rounded-full"></div>
                        <p className="text-xl text-gray-600 leading-relaxed shadow-sm bg-white p-6 rounded-2xl border border-gray-100 inline-block">
                            "No need to visit the field to get grains! Just order here and get all kinds of farm-fresh produce delivered at your doorstep."
                        </p>
                    </motion.div>
                </div>

                {
                    loading ? (
                        <div className="flex justify-center mt-12"><Loader /></div>
                    ) : error ? (
                        <div className="mt-8 max-w-3xl mx-auto"><Message variant='danger'>{error}</Message></div>
                    ) : (
                        <div className="mt-8">
                            <div className="flex flex-wrap -mx-4">
                                {
                                    consumerProducts && consumerProducts
                                        .slice(0, numberOfItems)
                                        .map((consumer, index) => (
                                            <ConsumerProducts
                                                key={consumer._id}
                                                _id={consumer._id}
                                                prod_name={consumer.prod_name}
                                                seller_name={consumer.seller_name}
                                                image={consumer.image}
                                                price={consumer.price}
                                                prod_size={consumer.prod_size}
                                                avalaible_location={consumer.avalaible_location}
                                                quantity={consumer.quantity}
                                            />
                                        ))
                                }
                            </div>

                            <div className="mt-12 text-center flex flex-col items-center">
                                {
                                    consumerProducts && numberOfItems >= consumerProducts.length ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full font-medium shadow-sm mb-6"
                                        >
                                            You've reached the end of the list.
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={showMore}
                                            className="bg-primary text-white hover:bg-gray-800 px-8 py-3 rounded-full font-bold shadow-md transition-colors"
                                        >
                                            Show More Products
                                        </motion.button>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ConsumerScreen
