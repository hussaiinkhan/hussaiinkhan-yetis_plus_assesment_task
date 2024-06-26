import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hussaiinkhan-yetis-plus-assesment-task-xnp6.vercel.app/api/customer/login', {
        phone,
        password
      });

      if (response.data.token) {
        // Save the token to local storage or state management
        localStorage.setItem('token', response.data.token);
        navigate('/clientdashboard');
      }
    } catch (error) {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://img.freepik.com/premium-vector/vector-hand-drawn-delicious-restaurant-food-background-pattern_690073-151.jpg?w=1380)' }}>
      
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#26ac81] bg-opacity-80 text-white p-8">
        <div>
          <h1 className="text-8xl font-bold mb-3">yetiş<span className='text-7xl font-bold text-[#fad71a]'>+</span> çarşı</h1>
          <p className="text-4xl ml-12 font-bold mb-2">hızır gibi yetişiyoruz!</p>
          <p className="text-xl ml-16 font-md">Are you an Admin?<Link className='font-bold text-[#fad71a]' to='/adminlogin'> Login here</Link></p>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-[#26ac81] bg-opacity-80 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Customer Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="tel" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="tel"
                placeholder='Enter your phone number'
                className="mt-1 p-2 border w-full rounded"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder='Enter your password'
                className="mt-1 p-2 border w-full rounded"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className='text-gray-700 font-medium text-md mb-2'>New here? <Link to='/clientsignup' className='font-bold text-[#26ac81]'>Signup</Link></p>
            <p className='sm:hidden text-gray-700 font-medium text-md mb-2'>Are you an Admin? <Link to='/adminlogin' className='font-bold text-[#26ac81]'>Login here</Link></p>
            <button type="submit" className="w-full font-bold bg-[#26ac81] text-white p-2 rounded hover:bg-[#fad71a]">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
