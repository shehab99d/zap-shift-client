// import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
// import { AuthContext } from '../../../context/AuthContext/AuthContext';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location);
    const from = location.state?.from || '/';
    // const from = location.state?.from || '/';
    // const { user, loading, signIn, createUser } = useContext(AuthContext);
    const { createUser, user, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [profilePic, setProfilePic] = useState('')
    const axiosInstance = useAxios();



    const onSubmit = data => {
        console.log(data);
        console.log(createUser);
        console.log('user in the auth state change', user);

        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);

                // update userInfo in the database 
                const userInfo = {
                    email: data.email,
                    role: 'user', // default role
                    creation_date: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/api/user', userInfo);
                console.log(userRes.data);


                // update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoUrl: profilePic
                }

                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('profile name pic update');
                    })
                    .catch(error => {
                        console.log(error);
                    })

                navigate(from)
            })
            .catch(error => {
                console.error(error.message);

            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image);
        const formData = new FormData();
        formData.append('image', image)

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_kay}`

        const res = await axios.post(imageUploadUrl, formData)
        setProfilePic(res.data.data.url);

        console.log(res.data);

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-black shadow-xl px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* name */}
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your Name"
                        />
                        {errors.email?.type === 'required' && (
                            <p className="text-sm text-red-500 mt-1">Name is required</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">Photo</label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your profile picture"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email?.type === 'required' && (
                            <p className="text-sm text-red-500 mt-1">Email is required</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6
                            })}
                            className="w-full text-black  px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password?.type === 'required' && (
                            <p className="text-sm text-red-500 mt-1">Password is required</p>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <p className="text-sm text-red-500 mt-1">Password must be 6 characters or longer</p>
                        )}
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                    >
                        Register
                    </button>



                    <p><small className='text-black'>Already have an account?</small><Link className='text-blue-500 underline ml-2' to='/register'>Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
