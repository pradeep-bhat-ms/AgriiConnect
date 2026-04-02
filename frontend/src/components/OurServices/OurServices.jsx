import React from 'react';
import { motion } from 'framer-motion';

const OurServices = () => {
    const services = [
        {
            title: "Heavy Machine",
            image: "images/services/heavy.svg",
            description: "No need to worry of labour costing more. Just rent all types of machines here!!",
            delay: 0.1
        },
        {
            title: "Gardening Kits",
            image: "images/services/gardening.svg",
            description: "We provide all gardening related products i.e. seeds, pesticides and heavy machinery.",
            delay: 0.2
        },
        {
            title: "Supplier",
            image: "images/services/supplier.svg",
            description: "Now you produce, and we are here to sell. Just list your items, and get proper pay for it.",
            delay: 0.3
        },
        {
            title: "Consumer",
            image: "images/services/consumer.svg",
            description: "Why visit Super Stores and Pay High? Order all products and get them delivered to your doorstep.",
            delay: 0.4
        }
    ];

    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-4xl font-extrabold text-primary mb-6 tracking-tight">
                            COMPREHENSIVE SERVICES
                        </h2>
                        <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded"></div>
                        <p className="text-lg text-gray-500 leading-relaxed">
                            AgriConnect provides a robust platform bridging the gap between farmers, suppliers, and consumers. Experience seamless trading with our curated services.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: service.delay, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="text-center group"
                        >
                            <div className="bg-gray-50 rounded-full w-40 h-40 mx-auto mb-6 flex items-center justify-center shadow-lg border-4 border-white group-hover:border-secondary transition-colors duration-300">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed px-2">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;
