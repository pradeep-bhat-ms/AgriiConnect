import React from 'react'
import { motion } from 'framer-motion';
import Meta from '../../components/Helmet/Meta';
import AddSupplierProduct from '../../components/SupplierProduct/AddSupplierProduct';
import { FaStore, FaCheckCircle, FaLeaf, FaUsers } from 'react-icons/fa';

const SupplierScreen = () => {
    const benefits = [
        { icon: <FaUsers className="text-3xl text-blue-500" />, title: "Millions of Farmers", text: "Connect with farmers from every corner of India." },
        { icon: <FaLeaf className="text-3xl text-green-500" />, title: "Eco-Friendly Platform", text: "Promote sustainable farming products." },
        { icon: <FaCheckCircle className="text-3xl text-orange-500" />, title: "Verified Listings", text: "All products go through quality verification." },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Meta title="AgriConnect | Supplier" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex justify-center mb-6">
                            <div className="bg-blue-100 p-5 rounded-2xl shadow-md inline-block">
                                <FaStore className="text-6xl text-blue-600" />
                            </div>
                        </div>
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Become a <span className="text-blue-600">Supplier</span>
                        </h1>
                        <div className="w-24 h-1.5 bg-blue-500 mx-auto mb-8 rounded-full"></div>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Sell your wide variety of farming products through our platform. We have millions of farmers connected from all parts of the country.
                        </p>
                    </motion.div>
                </div>

                {/* Benefits Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-start space-x-4"
                        >
                            <div className="bg-gray-50 p-3 rounded-xl shrink-0">{b.icon}</div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{b.title}</h3>
                                <p className="text-gray-500 text-sm">{b.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                        Add Your Product
                    </h2>
                    <AddSupplierProduct />
                </motion.div>
            </div>
        </div>
    )
}

export default SupplierScreen