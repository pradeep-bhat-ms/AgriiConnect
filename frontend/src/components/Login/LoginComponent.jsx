import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaLeaf, FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message/Message'
import Loader from '../Loader/Loader'
import { login } from '../../actions/userActions'
import Meta from '../Helmet/Meta'

const LoginComponent = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-24">
            <Meta title="AgriConnect | Sign In" />

            <div className="w-full max-w-md">
                {/* Logo / Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl mb-4 shadow-lg">
                        <FaLeaf className="text-white text-3xl" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Sign in to your AgriConnect account</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}

                    <form onSubmit={submitHandler} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Email / NIC <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaEnvelope />
                                </div>
                                <input
                                    type="text"
                                    value={email}
                                    placeholder="Enter email or NIC"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaLock />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    placeholder="Enter your password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-colors"
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg mt-2"
                        >
                            <FaSignInAlt className="mr-2" /> Sign In
                        </motion.button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-600">
                            New to AgriConnect?{' '}
                            <Link
                                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                                className="text-secondary hover:text-green-700 font-semibold transition-colors"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default LoginComponent
