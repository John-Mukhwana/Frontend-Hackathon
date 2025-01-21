

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle } from 'react-icons/fa';
import Spinner from '../shared/Spinner'; // Ensure the Spinner component is correctly imported
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables for security

const supabase = createClient(
  'https://cmyinpvkatiaiasckqgv.supabase.co', // Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNteWlucHZrYXRpYWlhc2NrcWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODczMDIsImV4cCI6MjAzODg2MzMwMn0.X3rhkCuSXsXvlqhUzeG5CS4AM3y6Tju7gnngneT7aCQ' // Replace with your Supabase Anon Key
);


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const getUserId = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).id : null;
  };

  const userId = getUserId();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        if (!userId) {
          throw new Error('User ID not found. Please log in.');
        }

        // Fetch user profile from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          throw error;
        }

        setUser(data);
        setEditForm(data);
      } catch (err) {
        console.error('Error fetching user data:', err.message);
        setError('Failed to load user profile. Please try again later.');
        toast.error('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    } else {
      setLoading(false);
      setError('User ID not found. Please log in.');
      toast.error('User ID not found. Please log in.');
    }
  }, [userId]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let profilePictureUrl = editForm.profile_picture_url;

      if (profilePicture) {
        const formData = new FormData();
        formData.append('file', profilePicture);
        formData.append('upload_preset', 'UserProfile'); // Replace with your Cloudinary upload preset

        // Upload to Cloudinary
        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dbczn8b8l/image/upload', // Replace with your Cloudinary URL
          formData
        );

        profilePictureUrl = cloudinaryResponse.data.secure_url;
      }

      const updatedForm = { ...editForm, profile_picture_url: profilePictureUrl };

      const { data, error } = await supabase
        .from('profiles')
        .update(updatedForm)
        .eq('id', userId);

      if (error) {
        throw error;
      }

      setUser(data);
      setEditForm(data);
      toast.success('Profile updated successfully!',
        {
            autoClose: 3000,
        }
      );
      
    } catch (err) {
      console.error('Error updating profile:', err.message);
      setError('Failed to update profile. Please try again.');
      toast.error('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  const getProfilePictureUrl = () => {
    return user?.profile_picture_url || editForm?.profile_picture_url;
  };

  return (
    <div className="flex flex-col mt-28">
      <ToastContainer />
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="error text-red-500">{error}</div>
      ) : user && editForm ? (
        <div className="bg-white p-6 items-center justify-center border md:border-blue-900 lg:ml-10 md:rounded-lg">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Profile</h1>
            <div className="relative">
              {getProfilePictureUrl() ? (
                <img
                  src={getProfilePictureUrl()}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                />
              ) : (
                <FaUserCircle className="w-32 h-32 text-gray-300" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="absolute top-0 left-0 w-32 h-32 opacity-0 cursor-pointer"
              />
            </div>
            <h2 className="mt-2 text-xl font-semibold text-gray-900">{editForm.full_name}</h2>
          </div>
          <form onSubmit={handleEditSave}>
            <div className="mb-4">
              <label className="block text-gray-900">Full Name</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                required
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
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900">Contact Phone</label>
              <input
                type="text"
                name="contact"
                value={editForm.contact}
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
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Spinner />,
        <div className="error text-red-500">User data is unavailable.</div>
      )}
    </div>
  );
};

export default UserProfile;