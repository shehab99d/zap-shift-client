import React from 'react';
import logo from '../../../assets/banner/logo.png'
import { Link } from 'react-router';

const ProFastLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center'>
                <img src={logo} alt="" />
                <p className='text-3xl font-bold -ml-2 mt-4'>ProFast</p>
            </div></Link>
    );
};

export default ProFastLogo;