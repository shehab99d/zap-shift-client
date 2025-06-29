import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../Loading';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/payments?email=${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        My Payment History <span className="text-blue-600">({payments.length})</span>
      </h2>

      {payments.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">No payment records found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white rounded-xl overflow-hidden shadow-md">
            <thead className="bg-blue-50 text-gray-700 uppercase text-sm tracking-wider">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Transaction ID</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, idx) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-6 font-medium text-gray-800">{idx + 1}</td>
                  <td className="py-3 px-6 font-mono text-sm text-blue-600 break-all">
                    {p.transactionId}
                  </td>
                  <td className="py-3 px-6 text-green-600 font-semibold">৳{p.amount}</td>
                  <td className="py-3 px-6 text-gray-600">
                    {new Date(p.timestamp || p.createdAt).toLocaleString('en-BD', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
