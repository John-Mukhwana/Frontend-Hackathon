import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BiArrowBack } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.contact || !formData.password || !formData.repeatPassword) {
      toast.error('All fields must be filled');
      return false;
    }

    if (formData.password !== formData.repeatPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const registrationPayload = {
          fullName: formData.name,
          email: formData.email,
          contactPhone: formData.contact,
          address: formData.address,
          password: formData.password,
        };

        await axios.post('http://localhost:8000/api/auth/register', registrationPayload);

        toast.success('Registration successful!', {
          position: 'top-center',
          autoClose: 3000,
        });
        navigate('/Login');
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 400) {
          toast.error('User is already registered. Please use a different email.');
        } else {
          toast.error('Registration failed. Please try again.');
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        <div className="relative h-56 md:h-auto md:w-1/2">
          <img
            src="https://res.cloudinary.com/dbczn8b8l/image/upload/v1737214995/hqwmfgni4yc3m9srfkvx.jpg"
            alt="Boat"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700/10 to-gray-900/70 flex flex-col items-center justify-center text-center p-6 text-white">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 animate-bounce">
            Manage Your Events Seamlessly
            </h2>
            <p className="text-sm md:text-lg">
              Sign up now and streamline your event management with Eventia!
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-center space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                required
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>


            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">Repeat Password</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition ease-in-out duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account? <Link to='/Login' className="text-blue-600 hover:underline">Login Here</Link>
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 flex items-center text-blue-600 hover:underline"
          >
            <BiArrowBack className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
