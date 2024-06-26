import React, { useState, useContext } from 'react';
import axios from 'axios';
import { LoadingContext } from '../../context/loadingContext';
import { Link } from 'react-scroll';

const AdForm = (props) => {
  const { reload, setReload } = useContext(LoadingContext);
  const [form, setForm] = useState({
    ad_title: '',
    area: '',
    description: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('https://hussaiinkhan-yetis-plus-assesment-task-xnp6.vercel.app/api/admin/ads', form, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
      });

      console.log(response);
      setReload(!reload);
      setForm({
        ad_title: '',
        area: '',
        description: '',
        price: '',
        image: '',
      });
    } catch (error) {
      console.error('Error creating ad:', error);
      alert('An error occurred while creating the ad.');
    }
  };

  return (
    <div name='adform' className="flex flex-col md:flex-row items-center min-h-screen bg-yellow-200 px-4">
      <div className="hidden md:block w-full md:w-1/2 text-center md:text-left p-8">
        <h2 className="text-5xl font-bold mb-6">Sell quickly with Yetiş+</h2>
        <p className="text-xl mb-4">Post your ads with us and reach a larger community of buyers.</p>
      </div>
      <div className="w-full md:w-1/2 p-8 bg-white shadow-2xl rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Post your Ad here!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="ad_title"
              placeholder="Enter your ad title"
              value={form.ad_title}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="area"
              placeholder="Enter a valid Address"
              value={form.area}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              placeholder="Something about your property"
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Please provide the URL of the image"
              value={form.image}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <Link to="adminads" smooth={true} duration={500}>
            <button
              type="submit"
              className="w-full mt-4 bg-[#26ac81] bg-opacity-80 font-bold text-white p-2 rounded-md hover:bg-[#fad71a]"
            >
              Post Ad
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AdForm;
