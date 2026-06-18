import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import data from './sliderData.js';

const SliderComponent = () => {
    // Just using the first item for the hero section to make it simple and clean.
    // In a real app we might cycle through them, but a static premium hero is often better than a slider.
    const heroData = data[0] || {
        title: "Welcome to AgriConnect",
        description: "Connecting Farmers to Consumers seamlessly.",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    };

    return (
        <div className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-[90vh]">
            <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                    backgroundImage: `url('${heroData.image}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
                <span id="blackOverlay" className="w-full h-full absolute opacity-60 bg-black"></span>
            </div>
            <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-white font-bold text-5xl md:text-6xl drop-shadow-md leading-tight">
                                {heroData.title}
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow max-w-3xl mx-auto">
                                {heroData.description}
                            </p>

                            <motion.div
                                className="mt-8 flex justify-center gap-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <Link to="/farmer" className="bg-secondary hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1">
                                    I'm a Farmer
                                </Link>
                                <Link to="/consumer" className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1">
                                    I'm a Consumer
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Wave Decorator */}
            <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                style={{ height: "70px" }}
            >
                <svg
                    className="absolute bottom-0 overflow-hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                >
                    <polygon
                        className="text-white fill-current"
                        points="2560 0 2560 100 0 100"
                    ></polygon>
                </svg>
            </div>
        </div>
    );
}

export default SliderComponent;
