import React from "react";

import logo1 from "./assets/brands/amazon.png";
import logo3 from "./assets/brands/casio.png";
import logo4 from "./assets/brands/moonstar.png";
import logo5 from "./assets/brands/randstad.png";
import logo6 from "./assets/brands/start-people 1.png";
import logo7 from "./assets/brands/start.png";

const CompanyLogos = () => {
  const logos = [logo1, logo3, logo4, logo5, logo6, logo7];

  return (
    <div className="mt-20 bg-gray-100 py-10 overflow-hidden rounded-xl">
      <h2 className="text-2xl font-semibold text-black text-center mb-8">
        We've helped thousands of <span className="text-black">sales teams</span>
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="logo-scroll-animation px-5">
          {logos.concat(logos).map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Logo ${idx}`}
              className="h-[24px 
              ] w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyLogos;
