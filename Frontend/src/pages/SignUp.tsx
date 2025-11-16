import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="text-3xl font-bold text-[#38B6FF] text-center block">
            Groomers
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up with OTP
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          <p className="text-gray-700 text-center">
            No password needed. Use your Indian phone number to receive an OTP and sign up instantly.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-[#38B6FF] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38B6FF]"
          >
            Continue to OTP Login
          </button>
          <div className="text-center">
            <Link to="/login" className="text-[#38B6FF] hover:text-blue-600">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;