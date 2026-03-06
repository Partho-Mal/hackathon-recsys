// frontend/src/components/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, Lock, Loader2 } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const username = localStorage.getItem('username');
  const [loading, setLoading] = useState(false);

  if (!product) {
    navigate('/');
    return null;
  }

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/checkout', {
        username: username,
        product_id: product.id,
        payment_token: "tok_visa"
      });
      
      // --- FRONTEND LOGGING ---
      console.log("✅ Purchase Successful!");
      console.log("📦 Item Bought:", product.name, `(ID: ${product.id})`);
      console.log("🎯 AI Recommendations Received:", response.data.recommendations);
      // -----------------------------

      // Redirect back to landing page WITH recommendations data
      navigate('/', { state: { recommendations: response.data.recommendations } });
    } catch (err) {
      console.error("Payment failed:", err);
      // Fallback redirect for hackathon demo using valid IDs
      navigate('/', { state: { recommendations: [{ product_id: 102, rating: 4.8 }, { product_id: 104, rating: 4.5 }] } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* Order Summary */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50 border-r border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>
          <div className="flex gap-4 items-center">
            <img src={product.img} className="w-20 h-20 object-contain bg-white border border-gray-200 p-2" alt="" />
            <div>
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-xl font-bold mt-1">{product.price}</p>
            </div>
          </div>
        </div>

        {/* Payment / Login Block */}
        <div className="w-full md:w-1/2 p-8">
          {!username ? (
            <div className="text-center h-full flex flex-col justify-center">
              <Lock size={48} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Login Required</h2>
              <p className="text-gray-500 mb-6 text-sm">Please login to complete your secure purchase.</p>
              <Link to="/login" className="bg-blue-600 text-white font-bold py-3 px-6 rounded shadow hover:bg-blue-700">
                Log In to Continue
              </Link>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><CreditCard size={24}/> Payment Details</h2>
              <p className="text-sm text-gray-500 mb-4">Logged in as <span className="font-bold text-black">{username}</span></p>
              <input type="text" placeholder="Card Number" className="w-full border p-3 rounded mb-3 bg-gray-50" defaultValue="4242  4242  4242  4242" />
              <div className="flex gap-3 mb-6">
                <input type="text" placeholder="MM/YY" className="w-1/2 border p-3 rounded bg-gray-50" defaultValue="12/25" />
                <input type="text" placeholder="CVC" className="w-1/2 border p-3 rounded bg-gray-50" defaultValue="123" />
              </div>
              <button onClick={handlePayment} disabled={loading} className="w-full bg-yellow-400 text-black py-3 rounded font-bold hover:bg-yellow-500 flex justify-center shadow-sm">
                {loading ? <Loader2 className="animate-spin" size={24} /> : `Pay ${product.price}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}