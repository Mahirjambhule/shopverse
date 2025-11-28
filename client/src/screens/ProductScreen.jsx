import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../slices/cartSlice';
import { FaStar } from 'react-icons/fa';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  const { userInfo } = useSelector((state) => state.auth);

  const fetchProduct = async () => {
    const { data } = await axios.get(`/api/products/${id}`);
    setProduct(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/products/${id}/reviews`, { rating, comment });
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      fetchProduct();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="container mx-auto p-4 mt-10">
      <Link to="/" className="inline-block mb-6 text-gray-600 hover:text-black font-medium transition-colors">
        &larr; Back to ShopVerse
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-h-[500px] w-auto object-contain" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm text-blue-600 font-semibold tracking-wide uppercase mb-2">{product.category}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Rating Display */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            <span className="text-gray-500 text-sm">({product.numReviews} reviews)</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">{product.description}</p>

          <div className="border-t border-b border-gray-100 py-6 mb-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${product.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center gap-4 mt-4">
                <span className="font-medium text-gray-700">Quantity:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:border-blue-500"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}> {x + 1} </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <button
            onClick={addToCartHandler}
            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-transform active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={product.countInStock === 0}
          >
            {product.countInStock > 0 ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>

      {/* --- REVIEWS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-200 pt-10">

        {/* List Reviews */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          {product.reviews.length === 0 && <p className="bg-blue-50 text-blue-800 p-4 rounded">No Reviews yet.</p>}

          <div className="flex flex-col gap-6">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <strong className="text-gray-900">{review.name}</strong>
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{review.createdAt.substring(0, 10)}</p>
                <p className="text-gray-800">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
          {userInfo ? (
            <form onSubmit={submitReviewHandler} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:border-black outline-none"
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
                <label className="block text-gray-700 font-bold mb-2">Comment</label>
                <textarea
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:border-black outline-none"
                ></textarea>
              </div>
              <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 self-start">
                Submit Review
              </button>
            </form>
          ) : (
            <p className="bg-gray-100 p-4 rounded text-gray-700">
              Please <Link to="/login" className="text-blue-600 underline font-bold">sign in</Link> to write a review.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductScreen;