import {useEffect} from "react";
import {  FaRegCalendarAlt, FaChartLine, FaEnvelopeOpenText } from 'react-icons/fa';
import "aos/dist/aos.css";
import AOS from "aos";

const WhyChooseUs = () => {

  useEffect(()=>{
    AOS.init({duration: 3000});
  },[]);

  return (
    <section  id="services" className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-teal-800">Why Choose Eventia</h2>
        <p className="mt-4 text-lg text-gray-700">
          Discover { `Eventia's` } comprehensive suite of tools designed to streamline event planning, management, and execution, ensuring every detail is handled with precision and excellence.
        </p>
        
        <div  className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Eevent planning Card*/}
          <div  data-aos="flip-up"  className="bg-blue-600 text-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-blue-700">
            <div className="flex items-center justify-center mb-4 text-4xl">
            <FaRegCalendarAlt />
            </div>
            <h3 className="text-xl font-semibold">Comprehensive Event Planning</h3>
            <p className="mt-2 text-blue-100">
               Plan every aspect of your event with our intuitive tools, from scheduling and venue selection to guest management and logistics.
            </p>
            <span className="block mt-3 font-semibold text-sm bg-blue-800 px-2 py-1 rounded-full">Only On Eventi</span>
          </div>

           {/* Guest Management Card */}
          <div data-aos="flip-up"  className="bg-green-700 text-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-green-800">
            <div className="flex items-center justify-center mb-4 text-4xl">
            <FaChartLine />
            </div>
            <h3 className="text-xl font-semibold">Real-Time Analytics</h3>
            <p className="mt-2 text-green-100">
               Gain insights into your events performance with real-time data on attendance, engagement, and feedback to make informed decisions.
            </p>
            <span className="block mt-3 font-semibold text-sm bg-green-800 px-2 py-1 rounded-full">Only On Eventi</span>
          </div>

          {/* Seamless Communication Card */}
          <div data-aos="flip-up"  className="bg-blue-800 text-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-blue-900">
            <div className="flex items-center justify-center mb-4 text-4xl">
            <FaEnvelopeOpenText />
            </div>
            <h3 className="text-xl font-semibold">Seamless Communication</h3>
            <p className="mt-2 text-blue-100">
              Facilitate smooth communication with your team and attendees through integrated messaging, notifications, and email campaigns.
            </p>
            <span className="block mt-3 font-semibold text-sm bg-blue-900 px-2 py-1 rounded-full">Only On Eventia</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
