// frontend/src/components/Landing.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
import Navbar from './Navbar';
import { PRODUCTS } from '../data';

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  
  // 1. Initialize with checkout state (if just purchased), otherwise null
  const [recommendations, setRecommendations] = useState(location.state?.recommendations || null);
  const username = localStorage.getItem('username');

  // 2. NEW: Fetch fresh recommendations on page load!
  useEffect(() => {
    const fetchFreshRecommendations = async () => {
      if (username) {
        try {
          const res = await axios.get(`http://localhost:8000/recommendations/${username}`);
          if (res.data && res.data.recommendations && res.data.recommendations.length > 0) {
            setRecommendations(res.data.recommendations);
            console.log("🔄 Fetched fresh recommendations from database:", res.data.recommendations);
          }
        } catch (err) {
          console.error("Failed to fetch fresh recommendations:", err);
        }
      }
    };

    // Always check for fresh data when the component mounts or username changes
    fetchFreshRecommendations();
  }, [username]);

  const handleCheckout = (product) => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-12">
      <Navbar cartCount={cart.length} />

      {/* Promotional Banner */}
      <div className="max-w-7xl mx-auto mt-4 px-2">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-sm p-8 text-white shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Mega Electronics Sale</h2>
            <p className="text-lg opacity-90">Get up to 40% off on top tech brands.</p>
          </div>
          <div className="hidden md:block text-5xl font-extrabold opacity-20">SALE</div>
        </div>
      </div>

      {/* Conditional: Recommended Section */}
      {/* 3. Updated to use the state variable `recommendations` */}
      {recommendations && recommendations.length > 0 && (
        <div className="max-w-7xl mx-auto mt-6 px-2">
          <div className="bg-white p-4 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Recommended based on your purchase</h2>
            <div className="flex overflow-x-auto gap-4 pb-2 snap-x">
              {recommendations.map((rec, i) => {
                const p = PRODUCTS.find(prod => prod.id === rec.product_id) || PRODUCTS[1];
                return (
                  <div key={i} className="min-w-[200px] bg-white border border-gray-100 p-3 rounded hover:shadow-md transition-shadow cursor-pointer snap-start" onClick={() => handleCheckout(p)}>
                    <img src={p.img} alt={p.name} className="w-full h-32 object-contain mb-2" />
                    <h3 className="font-semibold text-sm truncate">{p.name}</h3>
                    <p className="font-bold text-gray-900 mt-1">{p.price}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Product Grid */}
      <div className="max-w-7xl mx-auto mt-6 px-2">
        <div className="bg-white p-4 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Best Sellers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {PRODUCTS.map(p => (
              <div key={p.id} className="group border border-transparent hover:border-gray-200 hover:shadow-lg p-3 transition-all flex flex-col relative bg-white rounded-sm">
                <div className="h-40 w-full mb-4 cursor-pointer" onClick={() => handleCheckout(p)}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 cursor-pointer hover:text-blue-600" onClick={() => handleCheckout(p)}>{p.name}</h3>
                <div className="mt-auto pt-2">
                  <span className="text-xl font-bold text-gray-900 block mb-2">{p.price}</span>
                  <button onClick={() => handleCheckout(p)} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-sm text-sm shadow-sm transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}