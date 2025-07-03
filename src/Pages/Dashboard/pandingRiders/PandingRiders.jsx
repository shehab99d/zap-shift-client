import React, { useState } from 'react';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Loading';

const PendingRiders = () => {
    const [selectedRider, setSelectedRider] = useState(null);
    const axiosSecure = useAxiosSecure();

    const { data: riders = [], isPending, refetch } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get("/api/riders/pending");
            return res.data;
        }
    });

    const handleApprove = (riderId, email) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to approve this rider.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, approve!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/api/riders/approve/${riderId}`, {email})
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire('Approved!', 'Rider has been approved.', 'success');
                            refetch();
                            if (selectedRider?._id === riderId) setSelectedRider(null);
                        } else {
                            Swal.fire('Oops!', 'Approval failed.', 'error');
                        }
                    })
                    .catch(() => {
                        Swal.fire('Error!', 'Something went wrong.', 'error');
                    });
            }
        });
    };

    const handleReject = (riderId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to reject this rider application.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, reject!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/api/riders/reject/${riderId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Rejected', 'Rider application has been rejected.', 'info');
                            refetch();
                            if (selectedRider?._id === riderId) setSelectedRider(null);
                        } else {
                            Swal.fire('Oops!', 'Rejection failed.', 'error');
                        }
                    })
                    .catch(() => {
                        Swal.fire('Error!', 'Something went wrong.', 'error');
                    });
            }
        });
    };

    if (isPending) {
        return <Loading />;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>

            {/* ✅ Responsive Table on Desktop | Cards on Mobile */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.status}</td>
                                <td className="flex justify-center gap-2">
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => setSelectedRider(rider)}
                                        title="View Details"
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => handleApprove(rider._id, rider.email)}
                                    >
                                        <FaCheck className="mr-1" /> Accept
                                    </button>

                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleReject(rider._id, rider.email)}
                                    >
                                        <FaTimes className="mr-1" /> Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 📱 Card layout for mobile */}
            <div className="grid md:hidden gap-4">
                {riders.map((rider, index) => (
                    <div key={rider._id} className="card shadow p-4 bg-base-100">
                        <h3 className="font-bold">{index + 1}. {rider.name}</h3>
                        <p><strong>Email:</strong> {rider.email}</p>
                        <p><strong>Status:</strong> {rider.status}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            <button className="btn btn-sm btn-info" onClick={() => setSelectedRider(rider)}>
                                <FaEye />
                            </button>
                            <button className="btn btn-sm btn-success" onClick={() => handleApprove(rider._id)}>
                                <FaCheck className="mr-1" /> Accept
                            </button>
                            <button className="btn btn-sm btn-error" onClick={() => handleReject(rider._id)}>
                                <FaTimes className="mr-1" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🧾 Modal for full rider info */}
            {selectedRider && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Rider Details</h3>
                        <p><strong>Name:</strong> {selectedRider.name}</p>
                        <p><strong>Email:</strong> {selectedRider.email}</p>
                        <p><strong>Age:</strong> {selectedRider.age || 'N/A'}</p>
                        <p><strong>Region:</strong> {selectedRider.region || 'N/A'}</p>
                        <p><strong>District:</strong> {selectedRider.district || 'N/A'}</p>
                        <p><strong>Phone:</strong> {selectedRider.phone || 'N/A'}</p>
                        <p><strong>NID:</strong> {selectedRider.nid || 'N/A'}</p>
                        <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand || 'N/A'}</p>
                        <p><strong>Bike Registration:</strong> {selectedRider.bikeRegistration || 'N/A'}</p>
                        <p><strong>Other Info:</strong> {selectedRider.otherInfo || 'N/A'}</p>
                        <p><strong>Status:</strong> {selectedRider.status}</p>

                        <div className="mt-6 flex justify-end">
                            <button
                                className="btn btn-outline"
                                onClick={() => setSelectedRider(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingRiders;
