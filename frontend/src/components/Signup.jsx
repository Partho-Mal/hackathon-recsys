// frontend/src/components/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:8000/signup', { username, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create account. Try a different username.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="md:hidden flex items-center gap-2 mb-8 justify-center">
            <Sparkles size={32} />
            <h1 className="text-3xl font-extrabold tracking-tight">TechDrop</h1>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-gray-900">Create an account</h2>
          <p className="text-gray-500 mb-8">Join us to get personalized tech recommendations.</p>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="text" placeholder="Choose a Username" required value={username} onChange={e => setUsername(e.target.value)}
                className="w-full border border-gray-200 pl-10 p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="password" placeholder="Create a Password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-200 pl-10 p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors flex justify-center items-center disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
            </button>
          </form>
          
          <p className="mt-8 text-center text-gray-500 text-sm">
            Already have an account? <Link to="/login" className="text-black font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Hidden on Mobile */}
      <div className="hidden md:flex md:w-1/2 bg-gray-50 relative items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1550009158-9fd373285ed2?auto=format&fit=crop&w=1000&q=80" alt="Setup" className="absolute inset-0 w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h3 className="text-2xl font-bold mb-2">"The recommendations are unreal."</h3>
          <p className="text-gray-300">- Happy Customer</p>
        </div>
      </div>
    </div>
  );
}