import React from "react";

const services = [
    {
        id: 1,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: "https://i.ibb.co/SDTg4nZM/Illustration.png",
    },
    {
        id: 2,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: "https://i.ibb.co/8Dgcyc6Z/Group-4.png",
    },
    {
        id: 3,
        title: "Smart Logistics System",
        description:
            "Experience seamless delivery with our intelligent logistics network. Designed to optimize routes and minimize delays, ensuring faster service every time.",
        image: "https://i.ibb.co/SDTg4nZM/Illustration.png",
    },
];

const ServiceCards = () => {
    return (
        <section className="py-16 mt-10 rounded-xl bg-white px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-green-700 mb-4">Our Core Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover how we deliver excellence with speed, safety, and smart solutions for all your parcel needs.
                    </p>
                </div>

                <div className="grid lg:grid-cols-1 grid-cols-1 md:grid-cols-2 gap-10">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="flex flex-col sm:flex-row bg-gray-50 rounded-2xl p-6 gap-6 shadow-md hover:shadow-xl transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                        >
                            {/* Image */}
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-28 h-28 sm:w-32 sm:h-32 object-contain mx-auto sm:mx-0"
                            />

                            {/* Vertical Dashed Line (Only on large screen) */}
                            <div className="hidden sm:block w-px bg-dashed border-l-2 border-gray-300"></div>

                            {/* Text Content */}
                            <div className="text-center sm:text-left flex-1">
                                <h3 className="text-xl font-semibold text-green-800 mb-2">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceCards;
