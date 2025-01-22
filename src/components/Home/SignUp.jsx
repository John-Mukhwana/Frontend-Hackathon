// Code to create a registration form
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {supabase} from '../../helpers/supabaseClient';
import bcrypt from 'bcryptjs'; // Import bcryptjs

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
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
    const { name, email, contact, password, repeatPassword } = formData;
    if (!name || !email || !contact  || !password || !repeatPassword) {
      toast.error('All fields must be filled');
      return false;
    }

    if (password !== repeatPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Check if email already exists
      const { data: existingUser, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', formData.email)
        .single();

      if (existingUser) {
        toast.error('Email is already registered');
        return;
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(formData.password, saltRounds);

      // Insert user data into 'profiles' table
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            password: hashedPassword, // Store hashed password
            role: 'user', // Default role
          },
        ]);

      if (insertError) {
        toast.error(insertError.message);
      } else {
        toast.success('Registration successful!',{
          onClose: ()=> navigate('/login'),
          autoClose: 1000,
        })
    

      }

    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
          {/* Left Section: Image with Text */}
          <div className="relative h-56 md:h-auto md:w-1/2">
            <img
              src="https://res.cloudinary.com/dbczn8b8l/image/upload/v1737214993/orttayvpdwfgjonlyntx.jpg"
              alt="Boat"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b to-blue-900/70 flex flex-col items-center justify-center text-center p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 animate-bounce">
                Manage Your Events Seamlessly
              </h2>
              <p className="text-sm md:text-lg">
                Sign up now and streamline your event management with Eventia!
              </p>
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-center space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4">Create Account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
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

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
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

              {/* Contact */}
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
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

              {/* Repeat Password */}
              <div>
                <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">
                  Repeat Password
                </label>
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
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition ease-in-out duration-300"
              >
                Register
              </button>
            </form>

            {/* Login Link */}
            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log In Here
              </Link>
            </p>

            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="mt-4 flex items-center text-blue-600 font-medium hover:underline"
            >
              <BiArrowBack className="w-5 h-5 mr-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;