import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle } from 'react-icons/fa';
import Spinner from '../shared/Spinner'; // Ensure the Loading component is correctly imported

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const getToken = () => localStorage.getItem('authToken');
  const getUserId = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).userId : null;
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = getToken();
      const userId = getUserId();
      if (!token || !userId) throw new Error('Missing token or userId');

      const response = await axios.get(`http://localhost:5000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setEditForm(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Error fetching user data');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSave = async () => {
    try {
      const token = getToken();
      const userId = getUserId();
      if (!token || !userId || !editForm) throw new Error('Missing token, userId, or form data');

      let profilePictureUrl = editForm.profilePicture;

      if (profilePicture) {
        // Upload the profile picture to Cloudinary
        const formData = new FormData();
        formData.append('file', profilePicture);
        formData.append('upload_preset', 'UserProfile');

        const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/dbczn8b8l/image/upload', formData);
        profilePictureUrl = cloudinaryResponse.data.secure_url;
      }

      // Update the profile picture URL in editForm
      const updatedForm = { ...editForm, profilePicture: profilePictureUrl };

      await axios.put(`http://localhost:8000/api/users/${userId}`, updatedForm, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update the user state with the new profile picture
      setUser(updatedForm);
      setEditForm(updatedForm);
      toast.success('Profile updated successfully!');
      // Refresh on success
      fetchUserData();
      
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  // Get profile picture URL from user state
  const getProfilePictureUrl = () => {
    return user?.profilePicture || editForm?.profilePicture;
  };

  return (
    <div className='flex flex-col mt-28'>
      {user && editForm ? (
        <div className="bg-white p-6 items-center justify-center border md:border-blue-900 lg:ml-10 md:rounded-lg">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Profile</h1>
            <div className="relative">
              {getProfilePictureUrl() ? (
                <img
                  src={getProfilePictureUrl()}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 dark:border-gray-700"
                />
              ) : (
                <FaUserCircle className="w-32 h-32 text-gray-300 dark:text-gray-600" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="absolute top-0 left-0 w-32 h-32 opacity-0 cursor-pointer"
              />
            </div>
            <h2 className="mt-2 text-xl font-semibold text-gray-900">
              {editForm.fullName}
            </h2>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-900">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={editForm.fullName}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900">Email</label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900">Contact Phone</label>
              <input
                type="text"
                name="contactPhone"
                value={editForm.contactPhone}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900">Address</label>
              <input
                type="text"
                name="address"
                value={editForm.address}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Spinner/>
      )}
    </div>
  );
};

export default UserProfile;