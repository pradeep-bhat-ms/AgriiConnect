import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FaTruck, FaArrowRight } from 'react-icons/fa'
import CheckoutSteps from './../../components/CheckoutSteps/CheckoutSteps'
import { saveShippingAddress } from './../../actions/cartActions.js'
import Meta from '../../components/Helmet/Meta'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cartSeed)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    const fields = [
        { id: 'address', label: 'Address', value: address, setter: setAddress, placeholder: 'Enter your full address', type: 'text' },
        { id: 'city', label: 'City', value: city, setter: setCity, placeholder: 'Enter your city', type: 'text' },
        { id: 'postalCode', label: 'Postal Code', value: postalCode, setter: setPostalCode, placeholder: 'Enter postal code', type: 'text' },
        { id: 'country', label: 'Country', value: country, setter: setCountry, placeholder: 'Enter country', type: 'text' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Meta title="AgriConnect | Shipping" />

            <div className="max-w-2xl mx-auto px-4">
                <CheckoutSteps step1 step2 />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mt-8"
                >
                    <div className="flex items-center mb-8">
                        <div className="bg-primary/10 p-3 rounded-xl mr-4">
                            <FaTruck className="text-2xl text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Shipping Address</h1>
                            <p className="text-gray-500 text-sm">Where should we deliver your order?</p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-5">
                        {fields.map((field) => (
                            <div key={field.id}>
                                <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    {field.label} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id={field.id}
                                    type={field.type}
                                    value={field.value}
                                    placeholder={field.placeholder}
                                    required
                                    onChange={(e) => field.setter(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-colors"
                                />
                            </div>
                        ))}

                        <div className="pt-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
                            >
                                Continue to Payment <FaArrowRight className="ml-2" />
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default ShippingScreen
