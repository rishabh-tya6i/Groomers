import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Scissors } from 'lucide-react';
import api from '../lib/api';

interface Service {
  id: number;
  name: string;
  priceCents: number;
  durationMinutes: number;
}

const Booking: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const salonId = location.state?.salonId;

  useEffect(() => {
    if (salonId) {
      const fetchServices = async () => {
        try {
          const response = await api.get(`/salons/${salonId}/services`);
          setServices(response.data);
        } catch (error) {
          console.error('Failed to fetch services', error);
          alert('Failed to load services. Please try again.');
        }
      };
      fetchServices();
    }
  }, [salonId]);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      // ✅ Fixed: Proper ISO 8601 format with timezone
      const startTime = `${selectedDate}T${selectedTime}:00+05:30`; // IST timezone
      
      await api.post('/appointments', {
        salonId: salonId,
        serviceId: parseInt(selectedService),
        startTime: startTime,
      });
      
      alert('Booking confirmed! You can view your bookings in the My Bookings section.');
      navigate('/my-bookings');
    } catch (error: any) {
      console.error('Failed to create booking', error);
      const errorMessage = error.response?.data?.message || 
                          'Failed to create booking. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!salonId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Salon Not Specified</h2>
          <p className="text-gray-600 mb-6">Please select a salon first.</p>
          <button
            onClick={() => navigate('/salons')}
            className="bg-[#38B6FF] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Salons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Appointment</h1>
          <p className="text-gray-600">Choose your preferred service and time</p>
        </div>

        <form onSubmit={handleBooking} className="space-y-8">
          {/* Service Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Scissors className="h-5 w-5 mr-2 text-[#38B6FF]" />
              Select Service
            </h2>
            {services.length === 0 ? (
              <p className="text-gray-500">Loading services...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedService === service.id.toString()
                        ? 'border-[#38B6FF] bg-blue-50'
                        : 'border-gray-200 hover:border-[#38B6FF]'
                    }`}
                    onClick={() => setSelectedService(service.id.toString())}
                  >
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-[#38B6FF] font-semibold">₹{service.priceCents / 100}</p>
                    <p className="text-gray-500 text-sm">{service.durationMinutes} min</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date & Time Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-[#38B6FF]" />
              Select Date & Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#38B6FF] focus:border-[#38B6FF]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#38B6FF] focus:border-[#38B6FF]"
                  required
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#38B6FF] text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Clock className="h-5 w-5 mr-2" />
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;