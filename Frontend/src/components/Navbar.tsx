import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronDown, User, LogOut } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  userEmail?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout, userEmail }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-[#38B6FF] text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Groomers
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="hover:text-blue-200 transition-colors">
            Home
          </Link>
          <Link to="/salons" className="hover:text-blue-200 transition-colors">
            Find Salons
          </Link>
          {isLoggedIn && (
            <Link to="/my-bookings" className="hover:text-blue-200 transition-colors">
              My Bookings
            </Link>
          )}
          <Link to="/settings" className="hover:text-blue-200 transition-colors">
            Settings
          </Link>
          <Link to="/partners" className="hover:text-blue-200 transition-colors">
            Partners
          </Link>
          <Link to="/store" className="hover:text-blue-200 transition-colors">
            Store
          </Link>

          {/* Auth Section */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 hover:text-blue-200 transition-colors"
              >
                <span>Hi, {userEmail?.split('@')[0] || 'User'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-gray-700 border-b">
                    <p className="text-sm font-medium">Signed in as</p>
                    <p className="text-sm text-gray-600 truncate">{userEmail}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-1.5 bg-white text-[#38B6FF] font-medium rounded-full hover:bg-blue-50 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-1.5 border border-white rounded-full hover:bg-white hover:text-[#38B6FF] transition"
              >
                Signup
              </button>
            </div>
          )}

          {/* Cart */}
          <Link to="/cart">
            <ShoppingCart className="h-6 w-6 cursor-pointer hover:text-blue-200 transition-colors" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
