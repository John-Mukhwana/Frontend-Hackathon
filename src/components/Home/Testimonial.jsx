import  { useState, useEffect } from 'react';
import '../../styles/Testimonals.css';

const testimonials = [
  {
    name: 'John Mukhwana',
    image: 'https://res.cloudinary.com/dbczn8b8l/image/upload/v1723411446/rb3znmfhtghbapadvboe.jpg',
    review:
      "Eventia made planning our corporate event seamless and stress-free. The tools provided were intuitive and the support team was excellent!",
    rating: 5,
    date: 'January 21, 2025',
  },
  {
    name: 'Jane Smith',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    review:
      'Using Eventia for our wedding planning was a game-changer. Everything was organized perfectly and our guests had a fantastic time!',
    rating: 4,
    date: 'September 30, 2024',
  },
  {
    name: 'Alice Johnson',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    review:
      'Eventia’s analytics tools provided invaluable insights into our event’s performance. We were able to make informed decisions that led to a successful event.',
    rating: 5,
    date: 'August 5, 2024',
  },
  {
    name: 'Mike Brown',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    review:
      "The guest management features in Eventia are top-notch. RSVPs were tracked effortlessly and communication with attendees was smooth.",
    rating: 4,
    date: 'July 20, 2024',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds for a smoother transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonals" className="bg-gray-800 py-16 bg-cover bg-center">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
        <p className="text-lg text-gray-400 mb-10">Hear from our satisfied customers!</p>

        {/* Testimonial Cards */}
        <div className="relative overflow-hidden">
          <div className="testimonial-container flex space-x-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card flex-shrink-0 w-11/12 sm:w-2/5 md:w-1/3 px-4 transition-all duration-1000 ease-in-out ${
                  currentIndex === index ? 'active' : 'inactive'
                }`}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg bg-opacity-90 backdrop-blur-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-xl text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.date}</p>
                    </div>
                  </div>
                  <p className="text-lg italic text-gray-700 mb-4">"{testimonial.review}"</p>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 17.27l4.18 2.73-1.64-5.21L21 9.24l-5.34-.46L12 3 8.34 8.78 3 9.24l4.46 5.55-1.64 5.21L12 17.27z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-3 py-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-yellow-500' : 'bg-gray-300'}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;