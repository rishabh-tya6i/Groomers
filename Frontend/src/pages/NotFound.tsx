import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#38B6FF]">404</h1>
        <p className="text-2xl font-medium text-gray-800 my-4">Page Not Found</p>
        <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="bg-[#38B6FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
