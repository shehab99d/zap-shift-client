import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
    //   const res = await axiosSecure.get(`/api/parcels?email=${user.email}`);
    // const res = await axiosSecure.get(/api/parcels?email=${user.email});
    const res = await axiosSecure.get(`/api/parcels?email=${user.email}`);
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this parcel!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/api/parcels/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', 'Parcel has been deleted.', 'success');
          refetch();
        } else {
          Swal.fire('Not Found', 'Parcel not found or already deleted.', 'warning');
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Something went wrong!', 'error');
      }
    }
  };

  const handlePayment = (id) => {
    console.log('Navigating to payment for:', id);
    navigate(`/dashboard/payment/${id}`);
  };

  const handleDetails = (parcel) => {
    console.log('Parcel details:', parcel);
    Swal.fire('Details', JSON.stringify(parcel, null, 2), 'info');
  };

  const formatDate = (isoDate) => {
    const options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    };
    return new Date(isoDate).toLocaleString('en-US', options);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        My Parcels ({parcels.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Tracking ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, idx) => (
              <tr key={parcel._id}>
                <td>{idx + 1}</td>
                <td className="font-semibold">{parcel.title}</td>
                <td className="capitalize">{parcel.parcelType}</td>
                <td>{formatDate(parcel.creation_date)}</td>
                <td>৳{parcel.delivery_cost}</td>
                <td>
                  <span className={`badge ${parcel.paymentStatus === 'paid' ? 'badge-success' : 'badge-error'}`}>
                    {parcel.paymentStatus}
                  </span>
                </td>
                <td>
                  <span className={`badge ${parcel.status === 'pending' ? 'badge-warning' : 'badge-info'}`}>
                    {parcel.status}
                  </span>
                </td>
                <td className="font-mono text-sm">{parcel.trackingId}</td>
                <td className="space-y-1">
                  <button
                    onClick={() => handleDetails(parcel)}
                    className="btn btn-xs btn-info w-full">
                    Details
                  </button>

                  {parcel.paymentStatus === 'unpaid' && (
                    <button
                      onClick={() => handlePayment(parcel._id)}
                      className="btn btn-xs btn-success w-full">
                      Pay
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-error w-full">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
