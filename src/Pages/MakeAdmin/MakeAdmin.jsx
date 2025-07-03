import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState('');

  const {
    data: foundUsers = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['search-users', searchEmail],
    queryFn: async () => {
      if (!searchEmail.trim()) return [];
      const res = await axiosSecure.get(`/api/users/search?email=${searchEmail}`);
      return res.data;
    },
    enabled: false,
  });

  const handleSearch = () => {
    if (!searchEmail.trim()) {
      Swal.fire("Warning", "Please enter an email", "warning");
      return;
    }
    refetch();
  };

  const makeAdmin = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${email} an admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a", // green
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin"
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch("/api/users/make-admin", { email });
      Swal.fire("Success", `${email} is now an admin.`, "success");
      refetch();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  const removeAdmin = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to remove admin access from ${email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48", // red
      cancelButtonColor: "#16a34a",
      confirmButtonText: "Yes, Remove Admin"
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch("/api/users/remove-admin", { email });
      Swal.fire("Success", `${email} is no longer an admin.`, "info");
      refetch();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };


  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-base-200 rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-center">Make or Remove Admin</h2>

      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter email or partial email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
          disabled={isLoading}
        />
        <button onClick={handleSearch} className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {isError && (
        <div className="mt-4 text-red-500">
          {error?.response?.data?.message || error?.message || "Something went wrong."}
        </div>
      )}

      {!isError && !isLoading && foundUsers.length === 0 && (
        <div className="mt-4 text-yellow-600">No user found with this keyword.</div>
      )}

      {/* Show matched users in table */}
      {foundUsers.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {foundUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.creation_date ? new Date(user.creation_date).toLocaleDateString() : 'N/A'}</td>
                  <td className="capitalize">{user.role}</td>
                  <td className="text-center">
                    {user.role === 'admin' ? (
                      <button
                        onClick={() => removeAdmin(user.email)}
                        className="btn btn-sm btn-error"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => makeAdmin(user.email)}
                        className="btn btn-sm btn-success"
                      >
                        Make Admin
                      </button>
                    )}
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

export default MakeAdmin;
