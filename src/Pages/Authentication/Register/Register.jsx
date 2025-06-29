import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';



const Login = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from || '/';
    const { googleSignIn } = useAuth();

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result);
                // navigate('/')
                navigate(from)
            })
            .catch(error => {
                console.error(error);
            })
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = data => {
        console.log(data);
        // TODO: normal email-password login handle korbi ekhane
    };




    return (
        <div className="flex justify-center items-center min-h-screen bg-black px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">Email is required</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true })}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">Password is required</p>
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
                        Login
                    </button>

                    {/* Divider */}

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-2 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-black py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                    >
                        <FcGoogle size={24} />
                        <span>Continue with Google</span>
                    </button>
                    {/* Google Login */}


                    <p className="text-center mt-4">
                        <small className='text-black'>Don't have an account?</small>
                        <Link className='text-blue-500 underline ml-2' to="/login">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
