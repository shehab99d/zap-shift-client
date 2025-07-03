import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaUserSlash } from 'react-icons/fa';
import Loading from '../../../Loading';

const ActiveRider = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: riders = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['active-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/riders/active');
      return res.data;
    },
  });

  const deactivateMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/api/riders/deactivate/${id}`);
      return res.data;
    },
    onSuccess: (data, id) => {
      if (data.modifiedCount > 0) {
        Swal.fire('Deactivated', 'Rider has been deactivated.', 'success');
        refetch();
      } else {
        Swal.fire('Oops', 'Deactivation failed.', 'error');
      }
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  });

  const handleDeactivate = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This rider will be deactivated!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deactivateMutation.mutate(id);
      }
    });
  };

  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isPending) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name..."
        className="input input-bordered w-full max-w-sm mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 📱 Responsive Cards for Mobile */}
      <div className="grid grid-cols-1 md:hidden gap-4">
        {filteredRiders.length === 0 && (
          <p className="text-center">No riders found</p>
        )}
        {filteredRiders.map((rider, index) => (
          <div key={rider._id} className="card bg-base-100 shadow-md p-4">
            <p><strong>Name:</strong> {rider.name}</p>
            <p><strong>Email:</strong> {rider.email}</p>
            <p><strong>Phone:</strong> {rider.phone || 'N/A'}</p>
            <p><strong>Region:</strong> {rider.region || 'N/A'}</p>
            <p><strong>Status:</strong> <span className="badge badge-success">{rider.status}</span></p>
            <button
              className="btn btn-sm btn-error mt-3"
              onClick={() => handleDeactivate(rider._id)}
            >
              <FaUserSlash className="mr-1" />
              Deactivate
            </button>
          </div>
        ))}
      </div>

      {/* 🧾 Table for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone || 'N/A'}</td>
                <td>{rider.region || 'N/A'}</td>
                <td>
                  <span className="badge badge-success">{rider.status}</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error flex items-center"
                    onClick={() => handleDeactivate(rider._id)}
                  >
                    <FaUserSlash className="mr-1" />
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
            {filteredRiders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">No riders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRider;
