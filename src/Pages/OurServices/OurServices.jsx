import { FaTruckMoving, FaShippingFast, FaMapMarkedAlt, FaBoxOpen, FaRegClock, FaSmile } from "react-icons/fa";

const OurServices = () => {
    return (
        <section className="bg-green-800 rounded-2xl py-16 px-6 md:px-12 text-white">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                <p className="max-w-2xl mx-auto text-lg">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white text-green-800 hover:bg-amber-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300">
                    <FaTruckMoving className="text-4xl text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                    <p>Quick and secure delivery to your doorstep within the shortest possible time.</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white text-green-800 hover:bg-amber-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300">
                    <FaShippingFast className="text-4xl text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Same Day Shipping</h3>
                    <p>Orders are processed and shipped the same day for urgent needs.</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white text-green-800 hover:bg-amber-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300">
                    <FaMapMarkedAlt className="text-4xl text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
                    <p>Track your parcel in real time with live updates on every move.</p>
                </div>

                {/* Card 4 */}
                <div className="bg-white text-green-800 hover:bg-amber-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300">
                    <FaBoxOpen className="text-4xl text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Safe Packaging</h3>
                    <p>All items are carefully packed to ensure maximum protection during delivery.</p>
                </div>

                {/* Card 5 */}
                <div className="bg-white text-green-800 hover:bg-amber-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300">
                    <FaRegClock className="text-4xl text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">On-Time Guarantee</h3>
                    <p>We ensure your parcels always arrive on time — every single time.</p>
                </div>

                {/* Card 6 */}
                <div className="bg-white text-green-800 hover:bg-amber-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300">
                    <FaSmile className="text-4xl text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
                    <p>Your happiness is our priority. We go above and beyond to deliver excellence.</p>
                </div>
            </div>
        </section>
    );
};

export default OurServices;
