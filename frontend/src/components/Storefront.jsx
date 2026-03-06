// frontend/src/components/Storefront.jsx
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { PRODUCTS } from '../data';

export default function Storefront() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto sm:max-w-4xl p-4 sm:p-8 pb-20">
      <header className="flex items-center justify-between mb-8 pt-4">
        <h1 className="text-2xl font-extrabold tracking-tight">TechDrop</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-600">Hi, {username}</span>
          <button onClick={handleLogout} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><LogOut size={18}/></button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {PRODUCTS.map(p => (
          <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer" onClick={() => navigate('/checkout', { state: p })}>
            <div className="h-56 overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-900">{p.name}</h2>
              <p className="text-gray-500 mt-1 mb-4">{p.price}</p>
              <button className="w-full bg-black text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}