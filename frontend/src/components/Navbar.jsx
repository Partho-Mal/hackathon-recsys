// frontend/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut } from 'lucide-react';

export default function Navbar({ cartCount }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Storefront
        </Link>

        <div className="hidden md:flex flex-1 max-w-2xl bg-white rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full px-4 py-2 text-black outline-none"
          />
          <button className="bg-yellow-400 px-4 text-black">
            <Search size={20} />
          </button>
        </div>

        <div className="flex items-center gap-6">

          {username ? (
            <div className="relative group">

              <div className="flex items-center gap-2 cursor-pointer font-semibold">
                <User size={20} />
                Hello, {username}
              </div>

              <div className="absolute right-0 pt-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all">
                <div className="w-32 bg-white rounded-md shadow-lg border border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-6 py-1.5 font-bold rounded-sm hover:bg-gray-100"
            >
              Login
            </Link>
          )}

          <div className="flex items-center gap-1 font-bold cursor-pointer relative">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="hidden md:block ml-2">Cart</span>
          </div>

        </div>
      </div>
    </header>
  );
}