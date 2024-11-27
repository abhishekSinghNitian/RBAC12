import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import { Toaster } from 'react-hot-toast';
import AdminLayouts from './Layouts/AdminLaouts';
import UserLayout from './Layouts/UserLayout';
import PublicLayouts from './Layouts/PublicLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/AuthSlice';

export default function App() {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUser());
  }, [dispatch]); // Simplified dependency array, removed user as it's not needed

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* User Layout */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
          </Route>

          {/* Admin Layout */}
          <Route path="/admin" element={<AdminLayouts />}>
            <Route index element={<Admin />} />
           {/* Register route for admin */}
          </Route>


          {/* Public Layout */}
          <Route path="/" element={<PublicLayouts />}>
            <Route path="login" element={<Login />} />
          </Route>
            <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
