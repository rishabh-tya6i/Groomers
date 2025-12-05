import { useState, useEffect } from 'react';
import { Check, X, Eye, Trash2 } from 'lucide-react';
import api from '../lib/api';

interface Salon {
    id: number;
    name: string;
    owner?: {
        firstName: string;
        lastName: string;
        email: string;
    };
    contactEmail: string;
    status: string;
    addressLine: string;
    city: string;
    legalDocuments?: any;
}

const Salons = () => {
    const [salons, setSalons] = useState<Salon[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

    useEffect(() => {
        fetchSalons();
    }, []);

    const fetchSalons = async () => {
        try {
            const response = await api.get('/admin/salons');
            setSalons(response.data);
        } catch (error) {
            console.error('Error fetching salons:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            await api.put(`/admin/salons/${id}/status`, null, {
                params: { status: newStatus }
            });

            setSalons(salons.map(salon =>
                salon.id === id ? { ...salon, status: newStatus } : salon
            ));

            if (selectedSalon && selectedSalon.id === id) {
                setSelectedSalon({ ...selectedSalon, status: newStatus });
            }
        } catch (error) {
            console.error('Error updating salon status:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this salon?')) {
            return;
        }

        try {
            await api.delete(`/admin/salons/${id}`);
            setSalons(salons.filter(s => s.id !== id));
            if (selectedSalon && selectedSalon.id === id) {
                setSelectedSalon(null);
            }
        } catch (error) {
            console.error('Error deleting salon:', error);
            alert('Failed to delete salon');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Salons Management</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salon Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {salons.map((salon) => (
                            <tr key={salon.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{salon.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{salon.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {salon.owner ? `${salon.owner.firstName} ${salon.owner.lastName}` : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{salon.contactEmail}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${salon.status === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                                            salon.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                salon.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                        {salon.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setSelectedSalon(salon)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                            title="View Details"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        {(salon.status === 'PENDING' || salon.status === 'UNDER_REVIEW') && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(salon.id, 'VERIFIED')}
                                                    className="text-green-600 hover:text-green-900"
                                                    title="Approve"
                                                >
                                                    <Check className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(salon.id, 'REJECTED')}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Reject"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => handleDelete(salon.id)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete Salon"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedSalon && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Salon Details</h3>
                            <button onClick={() => setSelectedSalon(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Salon Name</label>
                                <p className="text-lg font-medium text-gray-900">{selectedSalon.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Owner</label>
                                <p className="text-gray-900">
                                    {selectedSalon.owner ? `${selectedSalon.owner.firstName} ${selectedSalon.owner.lastName}` : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Email</label>
                                <p className="text-gray-900">{selectedSalon.contactEmail}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Address</label>
                                <p className="text-gray-900">{selectedSalon.addressLine}, {selectedSalon.city}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Documents</label>
                                <div className="mt-1">
                                    {selectedSalon.legalDocuments ? (
                                        <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                                            {JSON.stringify(selectedSalon.legalDocuments, null, 2)}
                                        </pre>
                                    ) : (
                                        <p className="text-gray-500 italic">No documents provided</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mt-1
                    ${selectedSalon.status === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                                        selectedSalon.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                            selectedSalon.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'}`}>
                                    {selectedSalon.status}
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setSelectedSalon(null)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Close
                            </button>
                            {(selectedSalon.status === 'PENDING' || selectedSalon.status === 'UNDER_REVIEW') && (
                                <>
                                    <button
                                        onClick={() => {
                                            handleStatusChange(selectedSalon.id, 'REJECTED');
                                            setSelectedSalon(null);
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleStatusChange(selectedSalon.id, 'VERIFIED');
                                            setSelectedSalon(null);
                                        }}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        Approve
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Salons;
