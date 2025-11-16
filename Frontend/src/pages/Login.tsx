import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/api';

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post('/auth/otp/request', { phone });
      setRequested(true);
    } catch (err: any) {
      console.error('OTP request error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to send OTP';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await api.post('/auth/otp/verify', { phone, otp });
      onLogin(response.data.accessToken);
      navigate('/');
    } catch (err: any) {
      console.error('OTP verify error:', err);
      const errorMessage = err.response?.data?.message || 'Invalid or expired OTP';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="text-3xl font-bold text-[#38B6FF] text-center block">
            Groomers
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in with OTP
          </h2>
        </div>

        {!requested ? (
          <form className="mt-8 space-y-6" onSubmit={requestOtp}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#38B6FF] focus:border-[#38B6FF] focus:z-10 sm:text-sm"
                  placeholder="Indian Phone (e.g., 9876543210 or +919876543210)"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#38B6FF] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38B6FF] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">We'll create your account if you are new.</p>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={verifyOtp}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="otp" className="sr-only">OTP</label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#38B6FF] focus:border-[#38B6FF] focus:z-10 sm:text-sm"
                  placeholder="Enter 6-digit OTP"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#38B6FF] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38B6FF] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify & Sign in'}
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setRequested(false)}
                className="text-[#38B6FF] hover:text-blue-600"
              >
                Change phone number
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;