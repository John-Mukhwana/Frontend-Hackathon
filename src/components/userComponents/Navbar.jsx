// zustand is a small, fast and scalable bear-bones state-management solution. It has a very simple API and is easy to use. It is a great alternative to Redux, Recoil, and MobX.
import { useState, useEffect } from 'react';
import { Bell, Settings, LogOut, ChevronDown, Calendar, Menu } from 'lucide-react';
import { useMobileNav } from '../../hooks/useMobileNav';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { toggle: toggleMobileNav } = useMobileNav();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     try {
  //       const parsedUser = JSON.parse(storedUser);
  //       setUser(parsedUser);
  //     } catch (error) {
  //       console.error('Error parsing user data from localStorage:', error);
  //     }
  //   }
  //   fetchUserData();
  // }, []);

  // const getToken = () => localStorage.getItem('authToken');

  // const getUserId = () => {
  //   const userData = localStorage.getItem('user');
  //   return userData ? JSON.parse(userData).userId : null;
  // };

  // const fetchUserData = async () => {
  //   try {
  //     const token = getToken();
  //     const userId = getUserId();
  //     if (!token || !userId) throw new Error('Missing token or userId');

  //     const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });

  //     setUser(response.data);
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //     toast.error('Error fetching user data');
  //   }
  // };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const getProfilePictureUrl = () => {
    return user?.profilePicture;
  };

  return (
    <nav className="bg-white shadow-md px-4 py-2 fixed w-full top-0 z-10 md:rounded-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
            onClick={toggleMobileNav}
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <Calendar className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">Eventia</span>

          <p>{format(new Date(), 'dd/MM/yyyy')}</p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-6 w-6 text-gray-600" />
          </button>
          {/* <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="h-6 w-6 text-gray-600" />
          </button> */}
          
          <div className="relative">
            <button 
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
              onClick={() =>
                setShowProfileMenu(!showProfileMenu)}
            >
              <img 
                src={getProfilePictureUrl() || ''}
                alt="Profile" 
                className="h-8 w-8 rounded-full"
              />
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                <button
                  onClick={() => {
                    navigate('Profile');
                    setShowProfileMenu(false);
                  }} 
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button 
                  onClick={handleLogout}                 
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}