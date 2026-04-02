import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center py-8">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-secondary animate-spin"></div>
                <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-accent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
        </div>
    )
}

export default Loader
