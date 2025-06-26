import React from 'react';
import image from '../../assets/banner/location-merchant.png';
import top_banner from '../../assets/brands/be-a-merchant-bg.png';

const BeMerchant = () => {
  return (
    <div
      className="hero bg-[#03373D] py-12 px-4 md:px-10 lg:px-20 my-10 rounded-3xl bg-no-repeat bg-top bg-contain"
      style={{
        backgroundImage: `url(${top_banner})`,
      }}
    >
      <div className="hero-content flex flex-col-reverse lg:flex-row-reverse items-center gap-10">
        {/* Image */}
        <img
          src={image}
          className="w-64 sm:w-80 md:w-96 lg:w-[400px] xl:w-[450px] rounded-lg shadow-2xl"
          alt="Merchant"
        />

        {/* Text Content */}
        <div className="text-white text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-sm sm:text-base md:text-lg text-gray-100">
            We offer the lowest delivery charge with the highest value along with
            100% safety of your product. Pathao courier delivers your parcels in every
            corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="btn rounded-full btn-outline btn-success">
              Become a Merchant
            </button>
            <button className="btn rounded-full btn-outline btn-success">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
