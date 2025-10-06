import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Booking from './pages/Booking';
import SalonDiscovery from './pages/SalonDiscovery';
import SalonDetails from './pages/SalonDetails';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { setAuthToken } from './lib/api';
import api from './lib/api';

interface User {
  fullName: string;
  email: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      api.get('/users/me').then(response => {
        setUser(response.data);
        setIsLoggedIn(true);
      }).catch(() => {
        // Token is invalid
        localStorage.removeItem('token');
      });
    }
  }, []);

  const handleLogin = (token: string, email: string) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    api.get('/users/me').then(response => {
      setUser(response.data);
      setIsLoggedIn(true);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userEmail={user?.email || ''} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route 
              path="/login" 
              element={
                isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/signup" 
              element={
                isLoggedIn ? <Navigate to="/" /> : <SignUp />
              } 
            />
            <Route path="/booking" element={<Booking />} />
            <Route path="/salons" element={<SalonDiscovery />} />
            <Route path="/salon/:id" element={<SalonDetails />} />
            <Route 
              path="/my-bookings" 
              element={
                isLoggedIn ? <MyBookings /> : <Navigate to="/login" />
              }
            />
            <Route path="/settings" element={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Settings page coming soon...</p></div>} />
            <Route path="/partners" element={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Partners page coming soon...</p></div>} />
            <Route path="/store" element={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Store page coming soon...</p></div>} />
            <Route 
              path="/profile" 
              element={
                isLoggedIn ? <Profile user={user} /> : <Navigate to="/login" />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;