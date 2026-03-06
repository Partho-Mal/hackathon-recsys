// frontend/src/components/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Loader2, ShoppingBag } from 'lucide-react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel - Hidden on Mobile */}
      <div className="hidden md:flex md:w-1/2 bg-gray-50 relative items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80" alt="Tech" className="absolute inset-0 w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
        <div className="relative z-10 text-white text-center px-12">
          <ShoppingBag size={64} className="mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold mb-4">TechDrop</h1>
          <p className="text-lg text-gray-200">Your premium destination for next-gen tech.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="md:hidden flex items-center gap-2 mb-8 justify-center">
            <ShoppingBag size={32} />
            <h1 className="text-3xl font-extrabold tracking-tight">TechDrop</h1>
          </div>
          
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Welcome back</h2>
          <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)}
                className="w-full border border-gray-200 pl-10 p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-200 pl-10 p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors flex justify-center items-center disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
            </button>
          </form>
          
          <p className="mt-8 text-center text-gray-500 text-sm">
            Don't have an account? <Link to="/signup" className="text-black font-bold hover:underline">Sign up for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}