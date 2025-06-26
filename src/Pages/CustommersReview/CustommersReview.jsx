import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import customerBanner from "../../assets/banner/customer-top.png";
import profilePic from "../../assets/banner/image-upload-icon.png"; // placeholder

const testimonials = [
    {
        id: 1,
        text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
        name: "Awlad Hossin",
        title: "Senior Product Designer",
        img: profilePic,
    },
    {
        id: 2,
        text: "Posture Pro changed the way I sit and stand. No more back pain!",
        name: "John Doe",
        title: "UX Engineer",
        img: profilePic,
    },
    {
        id: 3,
        text: "Helps me stay focused and healthy throughout the day.",
        name: "Sara Lee",
        title: "Developer",
        img: profilePic,
    },
    {
        id: 4,
        text: "Very comfortable and effective for long hours.",
        name: "Michael Chen",
        title: "Freelancer",
        img: profilePic,
    },
    {
        id: 5,
        text: "Simple, yet so impactful. I feel much more confident.",
        name: "Anna Smith",
        title: "Marketing Expert",
        img: profilePic,
    },
    {
        id: 6,
        text: "Supportive and stylish. I wear it daily!",
        name: "Carlos Rivera",
        title: "Creative Director",
        img: profilePic,
    },
    {
        id: 7,
        text: "Highly recommend this for anyone with posture issues.",
        name: "Lisa Park",
        title: "Therapist",
        img: profilePic,
    },
];

const CustomersReview = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const next = () => {
        setSelectedIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setSelectedIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const getVisibleTestimonials = () => {
        const total = testimonials.length;
        const range = 2;
        const visible = [];
        for (let i = -range; i <= range; i++) {
            const index = (selectedIndex + i + total) % total;
            visible.push({ ...testimonials[index], position: i });
        }
        return visible;
    };

    return (
        <section className="py-20 bg-gray-50 text-black relative rounded-xl">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <img src={customerBanner} alt="Banner" className="mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold mb-2">What our customers are sayings</h1>
                <p className="text-gray-600 max-w-3xl mx-auto mb-10">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>

                <div className="relative flex items-center justify-center">
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md z-10"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex gap-4 overflow-hidden">
                        {getVisibleTestimonials().map((item) => {
                            const isActive = item.position === 0;
                            return (
                                <motion.div
                                    key={item.id}
                                    className={`rounded-xl bg-white p-6 shadow-md w-72 h-96 flex flex-col justify-between transition-all duration-500 ${isActive
                                            ? "opacity-100 scale-100 z-20"
                                            : "opacity-40 scale-95 translate-y-4 z-10"
                                        }`}
                                    animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.95 }}
                                >
                                    <div>
                                        <img src="https://i.ibb.co/YFsk27mx/Frame.png" alt="" className="w-10 h-10 rounded-full mb-4" />
                                        <p className="text-sm text-gray-700 mb-4">{item.text}</p>
                                        <hr className="w-20 border-dashed border-gray-300 mx-auto mb-4" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                                        <div className="text-left">
                                            <h3 className="text-base font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.title}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md z-10"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="mt-8 flex justify-center gap-2">
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-blue-600 scale-110" : "bg-gray-300"
                                }`}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomersReview;
