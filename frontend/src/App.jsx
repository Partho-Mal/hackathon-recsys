// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Storefront from './components/Storefront';
import Checkout from './components/Checkout';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Store is now protected behind /store */}
        <Route path="/store" element={<PrivateRoute><Storefront /></PrivateRoute>} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}