import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Phone, ArrowLeft } from 'lucide-react';
import api from '../lib/api';

interface Salon {
  id: number;
  name: string;
  description: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  contactPhone: string;
  services: Array<{
    id: number;
    name: string;
    priceCents: number;
    durationMinutes: number;
  }>;
}

const SalonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [salon, setSalon] = useState<Salon | null>(null);

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const response = await api.get(`/salons/${id}`);
        setSalon(response.data);
      } catch (error) {
        console.error('Failed to fetch salon details', error);
      }
    };

    if (id) {
      fetchSalon();
    }
  }, [id]);

  const handleBookNow = () => {
    navigate('/booking', { state: { salonId: salon?.id } });
  };

  if (!salon) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#38B6FF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading salon details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/salons')}
            className="flex items-center text-[#38B6FF] hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Salons
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Salon Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{salon.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">4.9</span>
                      <span>(156 reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={handleBookNow}
                    className="bg-[#38B6FF] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Book Now
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-5 w-5 text-[#38B6FF]" />
                  <span>{`${salon.addressLine}, ${salon.city}, ${salon.state} ${salon.postalCode}`}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-5 w-5 text-[#38B6FF]" />
                  <span>9:00 AM - 8:00 PM</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{salon.description}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {salon.services.map((service) => (
                  <div
                    key={service.id}
                    className="border-2 rounded-lg p-4 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <span className="text-[#38B6FF] font-bold">${service.priceCents / 100}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{service.durationMinutes} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetails;