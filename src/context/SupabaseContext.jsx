// filepath: /D:/Project 2025/Frontend-Hackathon/src/context/SupabaseContext.jsx
import React, { createContext, useContext } from 'react';
import { supabase } from '../helpers/supabaseClient'; // Correct: Named import

const SupabaseContext = createContext();

export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};