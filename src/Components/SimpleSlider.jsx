import React from "react";
import Slider from "react-slick";

import banner1 from "../assets/banner/banner1.png";
import banner2 from "../assets/banner/banner2.png";
import banner3 from "../assets/banner/banner3.png";

// Left Arrow
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer hover:bg-opacity-70"
    onClick={onClick}
  >
    &lt;
  </div>
);

// Right Arrow
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer hover:bg-opacity-70"
    onClick={onClick}
  >
    &gt;
  </div>
);

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="relative w-full mb-10 mx-auto mt-10 shadow-lg rounded-lg overflow-hidden">
      <Slider {...settings}>
        {[banner1, banner2, banner3].map((banner, index) => (
          <div key={index}>
            <img
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] object-cover"
              src={banner}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
