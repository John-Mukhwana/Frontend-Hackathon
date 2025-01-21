

// src/components/Home/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../../helpers/supabaseClient';
import bcrypt from 'bcryptjs'; // Import bcryptjs

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Reset error on input change
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      toast.error('All fields must be filled');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Fetch user by email
      const { data: userData, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', formData.email)
        .single();

      if (fetchError || !userData) {
        toast.error('Register first to login');
        setError('Register first to login');
        return;
      }

      // Compare hashed password
      const passwordMatch = bcrypt.compareSync(formData.password, userData.password);
      if (!passwordMatch) {
        toast.error('Invalid credentials');
        setError('Invalid credentials');
        return;
      }

      // Store user data in localStorage (Not secure for sensitive data)
      localStorage.setItem('user', JSON.stringify({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        contact: userData.contact,
        role: userData.role,
      }));

      // Navigate based on role
      if (userData.role === 'user') {
        toast.success('Login successful', {
          autoClose: 1000,
          onClose:()=>navigate('/UserDashboard'),
        });
       
      } else if (userData.role === 'admin') {
        navigate('/AdminDashboard');
      } else {
        toast.error('Invalid role');
        setError('Invalid role');
      }

    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.');
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
                Welcome Back!
              </h2>
              <p className="text-sm md:text-lg">
                Log in to continue your adventure.
              </p>
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-center space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4">Log In</h2>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  autoComplete="off"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                  required
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition ease-in-out duration-300"
              >
                Log In
              </button>
            </form>

            {/* Register Link */}
            <p className="text-sm text-gray-600 text-center mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Register Here
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

export default LoginForm;