import { useState, useEffect } from 'react';
import { Users, Store, Calendar, TrendingUp } from 'lucide-react';
import api from '../lib/api';

const Dashboard = () => {
    const [stats, setStats] = useState([
        { label: 'Total Customers', value: '...', icon: Users, color: 'bg-blue-500' },
        { label: 'Active Salons', value: '...', icon: Store, color: 'bg-green-500' },
        { label: 'Pending Appointments', value: '...', icon: Calendar, color: 'bg-orange-500' },
        { label: 'Revenue', value: '$0', icon: TrendingUp, color: 'bg-purple-500' },
    ]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [customersRes, salonsRes, appointmentsRes] = await Promise.all([
                api.get('/admin/customers'),
                api.get('/admin/salons'),
                api.get('/admin/appointments')
            ]);

            const customersCount = customersRes.data.length;
            const activeSalonsCount = salonsRes.data.filter((s: any) => s.status === 'VERIFIED').length;
            const pendingAppointmentsCount = appointmentsRes.data.filter((a: any) => a.status === 'PENDING').length;

            setStats([
                { label: 'Total Customers', value: customersCount.toString(), icon: Users, color: 'bg-blue-500' },
                { label: 'Active Salons', value: activeSalonsCount.toString(), icon: Store, color: 'bg-green-500' },
                { label: 'Pending Appointments', value: pendingAppointmentsCount.toString(), icon: Calendar, color: 'bg-orange-500' },
                { label: 'Revenue', value: '$0', icon: TrendingUp, color: 'bg-purple-500' }, // Revenue calculation logic needed
            ]);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex items-center">
                        <div className={`${stat.color} p-4 rounded-lg text-white mr-4`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
