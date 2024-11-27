import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('beforeSubmit')
      const request = await post('/api/auth/register', { name, email, password });
      const response = request.data;
      console.log('afterSubmit')
      if (request.status === 200) {
        toast.success(response.message);

        // After successful registration, fetch user role
        try {
          const roleResponse = await fetch(`/api/auth/CheckUser`, {
            method: 'GET',
            credentials: 'include', // Ensure cookies are included
          });

          if (!roleResponse.ok) {
            throw new Error('Failed to fetch role');
          }

          const roleData = await roleResponse.json();
          const role = roleData.role;

          if (role === 'admin') {
            toast.success('Redirecting to Admin Dashboard');
            navigate('/admin');
          } else if (role === 'user') {
            toast.success('Redirecting to Login Page');
            navigate('/login');
          } else {
            toast.error('Unknown role. Please login manually.');
            navigate('/login');
          }
        } catch (error) {
          navigate('/login');
        }
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration Error:', error);
    }
  };

  return (
    <>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              id="username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
          </div>
          <button type="submit">Register</button>
          <p className="register-link">
            Already have an account? <Link to={'/login'}>Login here</Link>
          </p>
        </form>
      </div>
    </>
  );
}

