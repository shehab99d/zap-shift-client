import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BeARider = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const rawData = useLoaderData(); 


    const regions = React.useMemo(() => {
        const map = {};
        rawData.forEach((item) => {
            if (!map[item.region]) {
                map[item.region] = new Set();
            }
            map[item.region].add(item.district);
        });
        return Object.entries(map).map(([region, districtsSet]) => ({
            region,
            districts: Array.from(districtsSet),
        }));
    }, [rawData]);

    const [districts, setDistricts] = useState([]);

    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        age: "",
        region: "",
        district: "",
        phone: "",
        nid: "",
        bikeBrand: "",
        bikeRegistration: "",
        otherInfo: "",
    });

    useEffect(() => {
        if (formData.region) {
            const found = regions.find((item) => item.region === formData.region);
            if (found) {
                setDistricts(found.districts);
                setFormData((prev) => ({ ...prev, district: "" }));
            } else {
                setDistricts([]);
                setFormData((prev) => ({ ...prev, district: "" }));
            }
        } else {
            setDistricts([]);
            setFormData((prev) => ({ ...prev, district: "" }));
        }
    }, [formData.region, regions]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try {
            const { data } = await axiosSecure.post("/api/rider-application", {
                ...formData,
                status: "pending",

            });

            if (data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Application Submitted",
                    text: "Bike rider application submitted successfully!",
                });


                setFormData((prev) => ({
                    ...prev,
                    age: "",
                    region: "",
                    district: "",
                    phone: "",
                    nid: "",
                    bikeBrand: "",
                    bikeRegistration: "",
                    otherInfo: "",
                }));
            } else {
                throw new Error("Failed to insert application");
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || err.message || "Something went wrong!",
            });
        }
    };


    return (
        <div className="max-w-lg mx-auto my-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center tracking-wide">
                Bike Rider Application
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <label className="block">
                    <span className="text-gray-700 font-semibold mb-1 block">Name</span>
                    <input
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        // readOnly
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 p-3 text-gray-700  focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </label>

                {/* Email */}
                <label className="block">
                    <span className="text-gray-700 font-semibold mb-1 block">Email</span>
                    <input
                        type="email"
                        name="email"
                        defaultValue={formData.email}
                        onChange={handleChange}
                        // readOnly
                        className="w-full rounded-md border border-gray-300 bg-gray-100 p-3 text-gray-700  focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </label>

                {/* Age */}
                <label className="block">
                    <span className="text-gray-700 font-semibold mb-1 block">Age</span>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min={18}
                        max={100}
                        placeholder="Enter your age"
                        className="w-full rounded-md border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </label>

                {/* Region */}
                <label className="block">
                    <span className="text-gray-700 font-semibold mb-1 block">Region</span>
                    <select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="" disabled>
                            Select Region
                        </option>
                        {regions.map(({ region }) => (
                            <option key={region} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                </label>

                {/* District */}
                <label className="block">
                    <span className="text-gray-700 font-semibold mb-1 block">District</span>
                    <select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        required
                        disabled={!formData.region}
                        className={`w-full rounded-md border p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${!formData.region ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                    >
                        <option value="" disabled>
                            Select District
                        </option>
                        {districts.map((dist) => (
                            <option key={dist} value={dist}>
                                {dist}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Phone Number */}
                <label className="block">
                    <span className="text-gray-700 font-semibold mb-1 block">Phone Number</span>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="^(\+88)?01[3-9]\d{8}$"
                        placeholder="e.g. 017XXXXXXXX"
                        className="w-full rounded-md border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </label>

                {/* National ID Card Number */}
                <label className="block">
                    <span className="text-gray-700 font-semibold mb-1 block">
                        National ID Card Number
                    </span>
                    <input
                        type="text"
                        name="nid"
                        value={formData.nid}
                        onChange={handleChange}
                        required
                        placeholder="Enter your NID number"
                        className="w-full rounded-md border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </label>

                {/* Bike Brand */}
                <label className="block">
                    <span className="text-gray-700 font-semibold mb-1 block">Bike Brand</span>
                    <input
                        type="text"
                        name="bikeBrand"
                        value={formData.bikeBrand}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Honda, Yamaha"
                        className="w-full rounded-md border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </label>

                {/* Bike Registration Number */}
                <label className="block">
                    <span className="text-gray-700 font-semibold mb-1 block">
                        Bike Registration Number
                    </span>
                    <input
                        type="text"
                        name="bikeRegistration"
                        value={formData.bikeRegistration}
                        onChange={handleChange}
                        required
                        placeholder="Enter your bike registration number"
                        className="w-full rounded-md border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </label>

                {/* Additional Information */}
                <label className="block">
                    <span className="text-gray-700 font-semibold mb-1 block">Additional Information</span>
                    <textarea
                        name="otherInfo"
                        value={formData.otherInfo}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Any other relevant information..."
                        className="w-full rounded-md border border-gray-300 p-3 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </label>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-bold py-3 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-400"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
};

export default BeARider;
