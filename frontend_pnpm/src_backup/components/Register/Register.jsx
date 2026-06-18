import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaSeedling, FaLeaf, FaUserPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message/Message'
import Loader from '../Loader/Loader'
import { register } from '../../actions/userActions'
import Meta from '../Helmet/Meta'

const Register = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cropSelection, setCropSelection] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            setMessage(null)
            dispatch(register(name, email, password, cropSelection))
        }
    }

    const leftFields = [
        { id: 'name', label: 'Full Name', icon: <FaUser />, value: name, setter: setName, type: 'text', placeholder: 'Your full name', required: true },
        { id: 'email', label: 'Email / NIC', icon: <FaEnvelope />, value: email, setter: setEmail, type: 'text', placeholder: 'Email or NIC number', required: true },
        { id: 'crop', label: 'Crop Selection', icon: <FaSeedling />, value: cropSelection, setter: setCropSelection, type: 'text', placeholder: 'e.g. Rice, Wheat (optional)', required: false },
    ]
    const rightFields = [
        { id: 'password', label: 'Password', icon: <FaLock />, value: password, setter: setPassword, type: 'password', placeholder: 'Create a password', required: true },
        { id: 'confirmPassword', label: 'Confirm Password', icon: <FaLock />, value: confirmPassword, setter: setConfirmPassword, type: 'password', placeholder: 'Re-enter password', required: true },
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-24">
            <Meta title="AgriConnect | Register" />

            <div className="w-full max-w-lg">
                {/* Logo / Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl mb-4 shadow-lg">
                        <FaLeaf className="text-white text-3xl" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Join AgriConnect</h1>
                    <p className="text-gray-500 mt-2">Create your account and start farming smarter</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}

                    <form onSubmit={submitHandler} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Left Column */}
                            <div className="space-y-5">
                                {leftFields.map(field => (
                                    <div key={field.id}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{field.icon}</div>
                                            <input
                                                type={field.type}
                                                value={field.value}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                onChange={e => field.setter(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-colors text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="space-y-5">
                                {rightFields.map(field => (
                                    <div key={field.id}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            {field.label} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{field.icon}</div>
                                            <input
                                                type={field.type}
                                                value={field.value}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                onChange={e => field.setter(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-colors text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}

                                {/* Password strength hint */}
                                <div className="bg-green-50 rounded-xl p-3 text-xs text-green-700 border border-green-100">
                                    <p className="font-semibold mb-1">Password Tips:</p>
                                    <ul className="list-disc list-inside space-y-0.5">
                                        <li>At least 8 characters</li>
                                        <li>Mix letters and numbers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-secondary text-white font-bold py-3.5 rounded-xl flex items-center justify-center hover:bg-green-700 transition-colors shadow-lg mt-2"
                        >
                            <FaUserPlus className="mr-2" /> Create Account
                        </motion.button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                                className="text-primary hover:text-gray-900 font-semibold transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Register
