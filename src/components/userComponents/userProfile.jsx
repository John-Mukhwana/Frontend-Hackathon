import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle } from 'react-icons/fa';
import Spinner from '../shared/Spinner'; // Ensure the Loading component is correctly imported
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  'https://cmyinpvkatiaiasckqgv.supabase.co', // Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNteWlucHZrYXRpYWlhc2NrcWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODczMDIsImV4cCI6MjAzODg2MzMwMn0.X3rhkCuSXsXvlqhUzeG5CS4AM3y6Tju7gnngneT7aCQ' // Replace with your Supabase Anon Key
);

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem('authToken');
  const getUserId = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).userId : null;
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
      } catch (err) {
        console.error('Error fetching user profile:', err.message);
        setError('Failed to load user profile. Please try again later.');
        toast.error('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleEditToggle = () => {
    setEditForm(!editForm);
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let profilePictureUrl = user.profile_picture_url;

      if (profilePicture) {
        const formData = new FormData();
        formData.append('file', profilePicture);
        formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

        // Upload to Cloudinary
        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // Replace with your Cloudinary URL
          formData
        );

        profilePictureUrl = cloudinaryResponse.data.secure_url;
      }

      // Update user profile in Supabase
      const { data, error } = await supabase
        .from('profiles')
        .update({
          username: user.username,
          email: user.email,
          bio: user.bio,
          profile_picture_url: profilePictureUrl,
        })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      setEditForm(false);
      toast.success('Profile updated successfully.');
    } catch (err) {
      console.error('Error updating profile:', err.message);
      setError('Failed to update profile. Please try again.');
      toast.error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-profile-container mt-20">
      <ToastContainer />
      <h2>User Profile</h2>
      <div className="profile-picture">
        {user.profile_picture_url ? (
          <img src={user.profile_picture_url} alt="Profile" />
        ) : (
          <FaUserCircle size={100} />
        )}
      </div>
      {editForm ? (
        <form onSubmit={handleSave} className="profile-form">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={user.username || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              name="bio"
              id="bio"
              value={user.bio || ''}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              type="file"
              name="profilePicture"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </div>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={handleEditToggle} disabled={saving}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="profile-details">
          <p>
            <strong>Username:</strong> {user.username || 'N/A'}
          </p>
          <p>
            <strong>Email:</strong> {user.email || 'N/A'}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio || 'N/A'}
          </p>
          <button onClick={handleEditToggle}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;