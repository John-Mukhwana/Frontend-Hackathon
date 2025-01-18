import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import  'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response= await fetch('http://localhost:8000/api/auth/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
      });

      if(!response.ok){
        const data = await response.json();
        console.log('Response data:', data);
        if(data.error=== 'data and hash arguments required'){
          setError('Register first to login'); 
          toast.error('Register first to login');
      }else if(data.error === 'Invalid credentials'){
        setError('Invalid credentials');
        toast.error('Invalid credentials');
      }else{
        setError(data.message)
        toast.error(data.message);
    }
    return;
  }
  const data = await response.json();
  console.log('Response data:', data);

  const token = data.token;
  const user = data.user;
  const role = data.user?.role;
  console.log('Role:', role);

  if(token){
    localStorage.setItem('authToken', token);
  }
  if(user){
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  if (role === 'user'){
    navigate('/UserDashboard');
   
  }else if(role === 'admin'){
    navigate('/AdminDashboard');
  }
  else{
    setError('Invalid role: ' + role);
    toast.error('Invalid role: ' + role);
  }



  }catch(err){
    console.error('error:', err);
    setError('An error occured. Please try again later.');
    toast.error('An error occured. Please try again later.');
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
            src="https://res.cloudinary.com/dbczn8b8l/image/upload/v1731187431/lzwyqzsowxgfjfirafmk.jpg"
            alt="Boat"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/70 to-blue-900/70 flex flex-col items-center justify-center text-center p-6 text-white">
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                autoComplete='off'
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder='Enter your email'
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder='Enter your password'
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition ease-in-out duration-300"
            >
              Log In
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>

          <p className="text-sm text-gray-600 text-center mt-4">
            {`Don't`} have an account? <Link to='/Signup' className=" text-blue-600 hover:underline">Register Here</Link>
          </p>

          {/* Back Button */}
          <button
            onClick={() => navigate('/')} // Adjust the route to your main page path
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
