import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import api from '../lib/api';

interface Salon {
  id: number;
  name: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
}

const SalonDiscovery: React.FC = () => {
  const [salons, setSalons] = useState<Salon[]>([]);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await api.get('/salons');
        setSalons(response.data);
      } catch (error) {
        console.error('Failed to fetch salons', error);
      }
    };

    fetchSalons();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Discover Our Salons</h1>
          <p className="text-xl text-gray-600">Find the perfect grooming experience near you</p>
        </div>

        {/* Salons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salons.map((salon) => (
            <div key={salon.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{salon.name}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{`${salon.addressLine}, ${salon.city}, ${salon.state} ${salon.postalCode}`}</span>
                </div>
                <Link
                  to={`/salon/${salon.id}`}
                  className="w-full bg-[#38B6FF] text-white py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalonDiscovery;