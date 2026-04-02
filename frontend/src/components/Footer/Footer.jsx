import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaInstagram, FaHome, FaEnvelope, FaPhone, FaPrint } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-100 mt-20 text-gray-700">
            {/* Social Media Strip */}
            <div className="bg-secondary text-white py-4 shadow-inner">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <h6 className="font-semibold text-lg text-center md:text-left">
                        Get connected with us on social networks!
                    </h6>
                    <div className="flex space-x-6">
                        <a href="#!" className="hover:text-accent transition-colors"><FaFacebookF size={20} /></a>
                        <a href="#!" className="hover:text-accent transition-colors"><FaTwitter size={20} /></a>
                        <a href="#!" className="hover:text-accent transition-colors"><FaGooglePlusG size={20} /></a>
                        <a href="#!" className="hover:text-accent transition-colors"><FaLinkedinIn size={20} /></a>
                        <a href="#!" className="hover:text-accent transition-colors"><FaInstagram size={20} /></a>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h6 className="uppercase font-bold text-gray-900 mb-4 flex items-center">
                            AgriConnect
                        </h6>
                        <hr className="w-16 border-t-2 border-secondary mb-4" />
                        <p className="text-sm leading-relaxed text-gray-600">
                            The purpose of AgriConnect is to provide connections between different roles in the agriculture industry. This app removes the requirement of contractors for farmers. Farmers can buy their required needs for farming from Sellers and they can also sell their products to Consumers.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h6 className="uppercase font-bold text-gray-900 mb-4">
                            Links
                        </h6>
                        <hr className="w-16 border-t-2 border-secondary mb-4" />
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/farmer" className="hover:text-secondary transition-colors">Farmer</Link></li>
                            <li><Link to="/consumer" className="hover:text-secondary transition-colors">Consumer</Link></li>
                            <li><Link to="/supplier" className="hover:text-secondary transition-colors">Supplier</Link></li>
                            <li><Link to="/cart" className="hover:text-secondary transition-colors">Cart</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h6 className="uppercase font-bold text-gray-900 mb-4">
                            Contact
                        </h6>
                        <hr className="w-16 border-t-2 border-secondary mb-4" />
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-center"><FaHome className="mr-3 text-secondary" /> Bangalore</li>
                            <li className="flex items-center"><FaEnvelope className="mr-3 text-secondary" /> Agriconnect@gmail.com</li>
                            <li className="flex items-center"><FaPhone className="mr-3 text-secondary" /> +91 9113072873</li>
                            <li className="flex items-center"><FaPrint className="mr-3 text-secondary" /> +91 9448398209</li>
                        </ul>
                    </div>

                    {/* Contact Form Section */}
                    <div>
                        <h6 className="uppercase font-bold text-gray-900 mb-4">
                            Get in touch
                        </h6>
                        <hr className="w-16 border-t-2 border-secondary mb-4" />
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Email address</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Comment</label>
                                <textarea
                                    rows="3"
                                    placeholder="Write Your Thoughts"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary text-sm"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-secondary hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors shadow-sm"
                            >
                                Send message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-gray-800 text-white py-4 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Copyright: AgriConnect</p>
                <p className="mt-1 text-xs text-gray-400">Developed by Pradeep Bhat M S</p>
            </div>
        </footer>
    );
};

export default Footer;
