import React, { useState } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#38B6FF] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Connect</h3>
          <p className="text-blue-100 mb-6">
            Connecting barbers, pet groomers and customers for seamless grooming.
          </p>
          <div className="flex space-x-4">
            <Facebook className="h-6 w-6 cursor-pointer hover:text-blue-200 transition-colors" />
            <Instagram className="h-6 w-6 cursor-pointer hover:text-blue-200 transition-colors" />
            <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-black text-sm font-bold">t</span>
            </div>
            <Twitter className="h-6 w-6 cursor-pointer hover:text-blue-200 transition-colors" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">GROOMING</h3>
          <div className="text-blue-100 space-y-2">
            <p>+91 7906782829</p>
            <p>support@groomers.com</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">SERVICES</h3>
          <p className="text-blue-100 mb-4">Enter your email to connect</p>
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email for updates here"
              className="w-full px-4 py-2 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-white text-[#38B6FF] py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-blue-100 text-sm mt-4">
            Contact barbers now through us
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-blue-300">
        <p className="text-blue-100 text-center">
          © 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;