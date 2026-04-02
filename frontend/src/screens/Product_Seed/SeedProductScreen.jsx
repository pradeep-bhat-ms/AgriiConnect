import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Rating from '../../components/Rating/Rating'
import {
    Col,
    Container,
    Row,
    Form,
} from 'react-bootstrap'
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa'

import { listSeedProductsDetails, createProductReview } from './../../actions/productSeedActions'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import Meta from '../../components/Helmet/Meta'
import { addToCart } from './../../actions/cartActions'

const SeedProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productSeedDetails = useSelector((state) => state.productSeedDetails || {})
    const { loading, error } = productSeedDetails

    const product =
        productSeedDetails.productSeed ||
        productSeedDetails.product ||
        (productSeedDetails._id ? productSeedDetails : null) ||
        null

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
        }

        if (!product || product._id !== match.params.id) {
            dispatch(listSeedProductsDetails(match.params.id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, match.params.id, successProductReview, product])

    const addToCartHandler = () => {
        if (product) {
            // ✅ Pass full product object (avoids duplicate fetch)
            dispatch(addToCart(product, Number(qty)))
            history.push('/cart')
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <Meta title={product?.name ? `AgriConnect | ${product.name}` : "AgriConnect | Seed"} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    to="/farmers/purchaseSeeds"
                    className="inline-flex items-center text-secondary hover:text-green-700 font-medium mb-8 transition-colors"
                >
                    <FaArrowLeft className="mr-2" /> GO BACK
                </Link>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : !product ? (
                    <Message variant="danger">Product not found</Message>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
                                {/* Product Image */}
                                <div className="lg:col-span-2 bg-gray-100 p-8 flex items-center justify-center">
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full max-w-sm rounded-lg object-contain drop-shadow-lg"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="p-8 lg:col-span-2 flex flex-col justify-center">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                    <div className="flex items-center mb-4">
                                        <Rating value={product.rating} text={`${product.numReviews || 0} reviews`} />
                                    </div>
                                    <div className="text-2xl font-semibold text-secondary mb-6">₹{product.price}</div>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {product.description}
                                    </p>
                                    <div className="border-t border-gray-100 pt-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-500">Status:</span>
                                            <span className={`font-semibold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Card */}
                                <div className="p-8 bg-gray-50 border-l border-gray-100 flex flex-col justify-center lg:col-span-1">
                                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                            <span className="text-gray-600">Price</span>
                                            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                                        </div>

                                        {product.countInStock > 0 && (
                                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                                                <span className="text-gray-600">Quantity</span>
                                                <select
                                                    value={qty}
                                                    onChange={(e) => setQty(Number(e.target.value))}
                                                    className="form-select w-20 px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary"
                                                >
                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={addToCartHandler}
                                            disabled={product.countInStock === 0}
                                            className={`w-full py-3 px-4 rounded-xl flex items-center justify-center font-bold text-white transition-colors ${product.countInStock === 0
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-secondary hover:bg-green-600 shadow-md hover:shadow-lg'
                                                }`}
                                        >
                                            <FaShoppingCart className="mr-2" /> Add To Cart
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Customer Reviews</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div>
                                    {!product?.reviews || product.reviews.length === 0 ? (
                                        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg">No Reviews Yet. Be the first to review!</div>
                                    ) : (
                                        <div className="space-y-6">
                                            {product.reviews.map((review) => (
                                                <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <strong className="text-gray-900">{review.name}</strong>
                                                        <span className="text-sm text-gray-500">{review.createdAt.substring(0, 10)}</span>
                                                    </div>
                                                    <Rating value={review.rating} />
                                                    <p className="mt-3 text-gray-600">{review.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Write a Review</h3>
                                    {successProductReview && (
                                        <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-4">Review submitted successfully</div>
                                    )}
                                    {loadingProductReview && <Loader />}
                                    {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}

                                    {userInfo ? (
                                        <form onSubmit={submitHandler} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                                <select
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                    className="w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary"
                                                    required
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="1">1 - Poor</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="4">4 - Very Good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                                                <textarea
                                                    rows="3"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    className="w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary"
                                                    required
                                                ></textarea>
                                            </div>
                                            <button
                                                disabled={loadingProductReview}
                                                type="submit"
                                                className="w-full bg-primary hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition-colors shadow-sm"
                                            >
                                                Submit Review
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
                                            Please <Link to="/login" className="font-bold underline text-yellow-900 hover:text-yellow-700">sign in</Link> to write a review.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default SeedProductScreen
