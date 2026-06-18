import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTractor, FaStore, FaShoppingBasket } from 'react-icons/fa';

const CardMenu = () => {
    const cards = [
        {
            title: "Farmer",
            icon: <FaTractor className="text-5xl text-secondary mb-4 drop-shadow" />,
            description: "If you are a farmer then you are at the perfect platform from where you can order all of your farming related products and you can sell your production also.",
            link: "/farmer",
            delay: 0.1
        },
        {
            title: "Supplier",
            icon: <FaStore className="text-5xl text-accent mb-4 drop-shadow" />,
            description: "Sell your wide variety of products related to farming, through our platform. We have millions of farmers connected from all parts of the country.",
            link: "/login?redirect=supplier",
            delay: 0.2
        },
        {
            title: "Consumer",
            icon: <FaShoppingBasket className="text-5xl text-yellow-500 mb-4 drop-shadow" />,
            description: "No need to visit the field to get grains! Just order here and get all kinds of farm-fresh produce delivered at your doorstep. Why wait? Go and order.",
            link: "/consumer",
            delay: 0.3
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-base text-secondary font-semibold tracking-wide uppercase">Who Are You?</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-primary sm:text-4xl">
                        Choose Your Path
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: card.delay, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl border border-gray-100 transition-all"
                        >
                            <div className="p-4 bg-gray-50 rounded-full mb-6">
                                {card.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>
                            <p className="text-gray-600 flex-grow mb-8 text-sm leading-relaxed">
                                {card.description}
                            </p>
                            <Link to={card.link} className="mt-auto w-full">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-secondary hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
                                >
                                    EXPLORE MORE
                                </motion.button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CardMenu;
