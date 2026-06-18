import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaTruck, FaCreditCard, FaCheckCircle } from 'react-icons/fa'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const steps = [
        { label: 'Sign In', icon: <FaUser />, to: '/login', active: step1 },
        { label: 'Shipping', icon: <FaTruck />, to: '/shipping', active: step2 },
        { label: 'Payment', icon: <FaCreditCard />, to: '/payment', active: step3 },
        { label: 'Place Order', icon: <FaCheckCircle />, to: '/placeorder', active: step4 },
    ]

    return (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <React.Fragment key={step.label}>
                    <div className="flex flex-col items-center">
                        {step.active ? (
                            <Link to={step.to} className="no-underline">
                                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg text-sm">
                                    {step.icon}
                                </div>
                                <span className="mt-1.5 text-xs font-bold text-secondary">{step.label}</span>
                            </Link>
                        ) : (
                            <div>
                                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm">
                                    {step.icon}
                                </div>
                                <span className="mt-1.5 text-xs font-medium text-gray-400 block text-center">{step.label}</span>
                            </div>
                        )}
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`h-0.5 w-12 mx-2 mb-4 ${steps[index + 1].active ? 'bg-secondary' : 'bg-gray-200'}`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default CheckoutSteps
