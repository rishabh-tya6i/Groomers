import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, Clock, MapPin } from 'lucide-react';
import api from '../lib/api';

interface HomeProps {
  isLoggedIn: boolean;
}

interface Salon {
  id: number;
  name: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
}

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {
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

  const testimonials = [
    {
      id: 1,
      name: 'Alex Johnson',
      rating: 5,
      comment: 'Amazing service! The barber really understood what I wanted.',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: 'Michael Brown',
      rating: 5,
      comment: 'Professional and friendly staff. Great atmosphere!',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 3,
      name: 'David Wilson',
      rating: 5,
      comment: 'Best grooming experience in town. Highly recommended!',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#38B6FF] to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Premium Grooming Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Experience the finest in men's grooming and styling
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/salons"
                className="bg-white text-[#38B6FF] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Find Salons
              </Link>
              {isLoggedIn && (
                <Link
                  to="/my-bookings"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#38B6FF] transition-colors flex items-center justify-center"
                >
                  View My Bookings
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Salons Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Salons</h2>
            <p className="text-gray-600 text-lg">Discover our top-rated salons</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {salons.slice(0, 3).map((salon) => (
              <div key={salon.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{salon.name}</h3>
                  <p className="text-gray-600 mb-4">{`${salon.addressLine}, ${salon.city}, ${salon.state} ${salon.postalCode}`}</p>
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

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Groomers?</h2>
            <p className="text-gray-600 text-lg">We provide exceptional service with attention to detail</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#38B6FF] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Barbers</h3>
              <p className="text-gray-600">Our skilled professionals have years of experience in men's grooming</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#38B6FF] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Book appointments at your convenience with our online system</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#38B6FF] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prime Location</h3>
              <p className="text-gray-600">Conveniently located in the heart of downtown</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 text-lg">Don't just take our word for it</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;