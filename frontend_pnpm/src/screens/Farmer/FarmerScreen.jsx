import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Meta from '../../components/Helmet/Meta';
import { FaSeedling, FaStoreAlt, FaTractor } from 'react-icons/fa';

const FarmerScreen = () => {
    const cards = [
        {
            title: "Purchase Seeds, Pesticides & Fertilizer",
            icon: <FaSeedling className="text-6xl text-green-500 mb-6 drop-shadow-lg" />,
            link: "/farmers/purchaseSeeds",
            description: "High-quality seeds, proven pesticides, and organic fertilizers available directly from verified suppliers.",
            bgGradient: "from-green-50 to-emerald-100",
            buttonColor: "bg-green-600 hover:bg-green-700",
            delay: 0.1
        },
        {
            title: "Sell Your Producing Material through Us",
            icon: <FaStoreAlt className="text-6xl text-blue-500 mb-6 drop-shadow-lg" />,
            link: "/login?redirect=supplier",
            description: "Become a registered supplier and connect with millions of consumers to sell your produce at fair prices.",
            bgGradient: "from-blue-50 to-indigo-100",
            buttonColor: "bg-blue-600 hover:bg-blue-700",
            delay: 0.2
        },
        {
            title: "Lend Heavy Machines and Tractors",
            icon: <FaTractor className="text-6xl text-orange-500 mb-6 drop-shadow-lg" />,
            link: "/farmers/lendMachines",
            description: "Need heavy machinery for your field? Rent advanced tractors and farming equipment economically.",
            bgGradient: "from-orange-50 to-amber-100",
            buttonColor: "bg-orange-600 hover:bg-orange-700",
            delay: 0.3
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Meta title="AgriConnect | Farmers" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Welcome, <span className="text-green-600">Farmer</span>
                        </h1>
                        <div className="w-24 h-1.5 bg-green-500 mx-auto mb-8 rounded-full"></div>
                        <p className="text-xl text-gray-600 leading-relaxed shadow-sm bg-white p-6 rounded-2xl border border-gray-100 inline-block">
                            "If you are a farmer then you are at the perfect platform from where you can order all of your farming related products and you can sell your production also."
                        </p>
                    </motion.div>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: card.delay, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className={`bg-gradient-to-br ${card.bgGradient} rounded-3xl p-8 shadow-xl flex flex-col items-center text-center relative overflow-hidden group border border-white/50`}
                        >
                            {/* Decorative background circle */}
                            <div className="absolute w-40 h-40 bg-white/40 rounded-full top-0 right-0 -mr-10 -mt-10 backdrop-blur-3xl transform group-hover:scale-150 transition-transform duration-700 ease-out z-0"></div>

                            <div className="z-10 bg-white p-5 rounded-full shadow-md mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                                {card.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4 z-10 leading-tight">
                                {card.title}
                            </h3>

                            <p className="text-gray-700 mb-8 flex-grow z-10 font-medium">
                                {card.description}
                            </p>

                            <Link to={card.link} className="w-full z-10 mt-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-full ${card.buttonColor} text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all flex justify-center items-center`}
                                >
                                    EXPLORE MORE
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </motion.button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FarmerScreen
