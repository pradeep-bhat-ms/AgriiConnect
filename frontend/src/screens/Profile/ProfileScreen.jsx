import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaSeedling, FaBoxOpen, FaEdit, FaStar, FaTimes, FaCheck } from 'react-icons/fa'
import Message from './../../components/Message/Message'
import Loader from './../../components/Loader/Loader'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { listMyOrders } from './../../actions/orderAction'
import { listMyProducts } from './../../actions/supplierProduct'
import Meta from '../../components/Helmet/Meta'

const ProfileScreen = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cropSelection, setCropSelection] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [activeTab, setActiveTab] = useState('profile')
    const [reviewVisible, setReviewVisible] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const supplierProdictListMy = useSelector(state => state.supplierProdictListMy)
    const { loading: loadingProducts, error: errorProducts, products } = supplierProdictListMy

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
                dispatch(listMyProducts())
            } else {
                setName(user.name)
                setEmail(user.email)
                setCropSelection(user.cropSelection || '')
            }
        }
    }, [userInfo, history, user, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            setMessage(null)
            dispatch(updateUserProfile({ id: user._id, name, email, password, cropSelection }))
        }
    }

    const tabs = [
        { id: 'profile', label: 'My Profile', icon: <FaUser /> },
        { id: 'orders', label: 'My Orders', icon: <FaBoxOpen /> },
        { id: 'products', label: 'My Products', icon: <FaSeedling /> },
    ]

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Meta title="AgriConnect | Profile" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-gray-700 rounded-3xl p-8 mb-8 text-white flex items-center gap-6 shadow-xl">
                    <div className="w-20 h-20 rounded-full bg-white/10 text-white flex items-center justify-center text-4xl font-bold uppercase border-2 border-white/30">
                        {name ? name.charAt(0) : <FaUser />}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{name || 'Loading...'}</h1>
                        <p className="text-white/70">{email}</p>
                        {cropSelection && <span className="inline-flex items-center mt-1 bg-secondary/30 text-green-300 text-xs px-3 py-1 rounded-full"><FaSeedling className="mr-1.5" />{cropSelection}</span>}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-8 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-fit">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <span className="mr-2">{tab.icon}</span> {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-lg"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Update Profile</h2>
                            {message && <Message variant="danger">{message}</Message>}
                            {error && <Message variant="danger">{error}</Message>}
                            {success && <Message variant="success">Profile Updated Successfully!</Message>}
                            {loading && <Loader />}

                            <form onSubmit={submitHandler} className="space-y-4">
                                {[
                                    { label: 'Full Name', icon: <FaUser />, value: name, setter: setName, type: 'text', placeholder: 'Your full name', required: true },
                                    { label: 'Email / NIC', icon: <FaEnvelope />, value: email, setter: setEmail, type: 'text', placeholder: 'Email or NIC', required: true },
                                    { label: 'Crop Selection', icon: <FaSeedling />, value: cropSelection, setter: setCropSelection, type: 'text', placeholder: 'e.g. Rice, Wheat', required: false },
                                    { label: 'New Password', icon: <FaLock />, value: password, setter: setPassword, type: 'password', placeholder: 'Leave blank to keep current', required: false },
                                    { label: 'Confirm Password', icon: <FaLock />, value: confirmPassword, setter: setConfirmPassword, type: 'password', placeholder: 'Re-enter new password', required: false },
                                ].map((field, i) => (
                                    <div key={i}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{field.icon}</div>
                                            <input
                                                type={field.type}
                                                value={field.value}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                onChange={e => field.setter(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-colors"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-md mt-2"
                                >
                                    Update Profile
                                </motion.button>
                            </form>
                        </motion.div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <motion.div
                            key="orders"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                        >
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
                            </div>
                            {loadingOrders ? <div className="p-8 flex justify-center"><Loader /></div>
                                : errorOrders ? <div className="p-6"><Message variant="danger">{errorOrders}</Message></div>
                                    : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead className="bg-gray-50 border-b border-gray-100">
                                                    <tr>
                                                        {['ID', 'DATE', 'TOTAL', 'PAID', 'DELIVERED', 'ACTION'].map(h => (
                                                            <th key={h} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {orders && orders.map(order => (
                                                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 text-gray-500 font-mono text-xs">{order._id.substring(0, 10)}...</td>
                                                            <td className="px-6 py-4 text-gray-600">{order.createdAt?.substring(0, 10)}</td>
                                                            <td className="px-6 py-4 font-semibold text-gray-900">₹{order.totalPrice}</td>
                                                            <td className="px-6 py-4">
                                                                {order.isPaid
                                                                    ? <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full"><FaCheck className="mr-1" />{order.paidAt?.substring(0, 10)}</span>
                                                                    : <span className="inline-flex items-center bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-full"><FaTimes className="mr-1" />Unpaid</span>}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {order.isDelivered
                                                                    ? <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full"><FaCheck className="mr-1" />{order.deliveredAt?.substring(0, 10)}</span>
                                                                    : <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded-full">Pending</span>}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <Link to={`/order/${order._id}`} className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                                                                    Details
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                        </motion.div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                        >
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">My Products</h2>
                            </div>
                            {loadingProducts ? <div className="p-8 flex justify-center"><Loader /></div>
                                : errorProducts ? <div className="p-6"><Message variant="danger">{errorProducts}</Message></div>
                                    : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead className="bg-gray-50 border-b border-gray-100">
                                                    <tr>
                                                        {['IMAGE', 'NAME', 'EMAIL/NIC', 'CROP', 'REVIEWED', 'EDIT'].map(h => (
                                                            <th key={h} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {products && products.map(product => (
                                                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4">
                                                                <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
                                                            </td>
                                                            <td className="px-6 py-4 font-semibold text-gray-900">{product.name}</td>
                                                            <td className="px-6 py-4 text-gray-500">{product.email}</td>
                                                            <td className="px-6 py-4">
                                                                {product.cropSelection && <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full">{product.cropSelection}</span>}
                                                            </td>
                                                            <td className="px-6 py-4 relative">
                                                                {product.isReviwed ? (
                                                                    <div className="relative">
                                                                        <button
                                                                            onClick={() => setReviewVisible(reviewVisible === product._id ? null : product._id)}
                                                                            className="inline-flex items-center bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-full hover:bg-green-200 transition-colors"
                                                                        >
                                                                            <FaStar className="mr-1" /> Check Reviews
                                                                        </button>
                                                                        {reviewVisible === product._id && (
                                                                            <div className="absolute z-50 left-0 top-10 bg-white border border-gray-200 rounded-xl shadow-xl p-4 min-w-[220px]">
                                                                                <p className="font-bold text-gray-900 mb-2">Rating: {product.rating}/5</p>
                                                                                {product.reviews?.map(review => (
                                                                                    <div key={review._id} className="bg-gray-50 p-2 rounded-lg mb-1 text-xs text-gray-700">
                                                                                        {review.comment}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <span className="inline-flex items-center bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full"><FaTimes className="mr-1" />Not Reviewed</span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <Link to={`/supplierproducts/${product._id}/edit`} className="p-2 bg-primary text-white rounded-lg hover:bg-gray-700 transition-colors inline-flex">
                                                                    <FaEdit />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ProfileScreen
