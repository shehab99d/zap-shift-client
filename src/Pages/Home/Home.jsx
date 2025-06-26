import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import SliderLogos from '../SliderLogos/SliderLogos';
import ServiceCards from '../ServocesCard/ServocesCard';
import BeMerchant from '../BeMarchant/BeMerchant';
import CustomersReview from '../CustommersReview/CustommersReview';
import Spline3D from '../../Spline3D';
// import RotatingSpline from '../../RotatingSpline';
import RotatingSpline from '../../RotatingSpline';
import BannerBlocks from '../BannerBlocks';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurServices></OurServices>
            <SliderLogos></SliderLogos>
            <Spline3D></Spline3D>
            <RotatingSpline></RotatingSpline>
            <BannerBlocks></BannerBlocks>
            <ServiceCards></ServiceCards>
            <BeMerchant></BeMerchant>
            <CustomersReview></CustomersReview>
        </div>
    );
};

export default Home;