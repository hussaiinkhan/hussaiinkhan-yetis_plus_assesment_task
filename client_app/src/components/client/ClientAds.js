import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ClientCard from './ClientCard';
import { LoadingContext } from '../../context/loadingContext';

const AdminAds = () => {
  const { reload, setReload } = useContext(LoadingContext);
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [budget, setBudget] = useState(0); // Initialize budget with 0 or null if not fetched yet
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch client's budget
  const fetchClientBudget = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
      const response = await axios.get('https://yetisplusapi.onrender.com/api/customer/budget', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBudget(response.data.budget);
      console.log('Client budget:', response.data.budget); // Log the budget fetched
    } catch (error) {
      console.error('Error fetching client budget:', error);
      // Handle error, e.g., show error message to user
    }
  };

  useEffect(() => {
    const fetchAds = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://yetisplusapi.onrender.com/api/customer/ads', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAds(response.data);
        setFilteredAds(response.data); // Initialize filteredAds with fetched ads
      } catch (error) {
        setError('Failed to fetch ads');
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
    fetchClientBudget(); // Fetch client's budget on component mount
  }, [reload]);

  const handleClick = async (ad) => {
    if (ad.price < budget) {
      try {
        const token = localStorage.getItem('token');
        await axios.post(`https://yetisplusapi.onrender.com/api/customer/ads/${ad._id}/rent`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setReload(!reload);
      } catch (error) {
        console.error('Error renting property:', error);
        // Handle error, e.g., display error message to user
      }
      alert('Property Rented!');
    } else {
      alert('Your budget is not sufficient!');
    }
  };

  const handleFilterAll = () => {
    setFilteredAds(ads);
  };

  const handleFilterForMe = () => {
    setFilteredAds(ads.filter(ad => ad.price <= budget));
  };

  const handleSortAscending = () => {
    const sortedAds = [...filteredAds].sort((a, b) => a.price - b.price);
    setFilteredAds(sortedAds);
  };

  const handleSortDescending = () => {
    const sortedAds = [...filteredAds].sort((a, b) => b.price - a.price);
    setFilteredAds(sortedAds);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div name='clientads' className="flex flex-col px-4 justify-center items-center h-full bg-[#fad71a] bg-opacity-10">
      <h2 className="text-4xl md:text-5xl mt-12 font-semibold mb-3 text-center">Yetiş+ ads for you</h2>
      <p className="text-xl md:text-2xl font-bold mb-3 text-center">Discover top rental properties effortlessly!</p>
      <p className="text-xl font-semibold mb-3 text-center">Your Budget = {budget} TL</p>
      <div className='w-full p-4 flex justify-between'>
        <div>
          <h2 className='text-xl font-bold'>Filter Ads:</h2>
          <button onClick={handleFilterAll} className='font-semibold mr-2 bg-[#26ac81] text-white px-8 py-1 rounded-lg hover:bg-[#fad71a]'>All</button>
          <button onClick={handleFilterForMe} className='font-semibold bg-[#26ac81] text-white px-4 py-1 rounded-lg hover:bg-[#fad71a]'>For me</button>
        </div>
        <div>
          <h2 className='text-xl font-bold'>Sort Ads:</h2>
          <button onClick={handleSortAscending} className='font-semibold mr-2 bg-[#26ac81] text-white px-2 py-1 rounded-lg hover:bg-[#fad71a]'>Ascending</button>
          <button onClick={handleSortDescending} className='font-semibold bg-[#26ac81] text-white px-2 py-1 rounded-lg hover:bg-[#fad71a]'>Descending</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {filteredAds.map(ad => (
          <ClientCard
            key={ad._id}
            image={ad.image}
            title={ad.ad_title}
            description={ad.description}
            area={ad.area}
            price={ad.price}
            isRented={ad.is_rent}
            handleClick={() => handleClick(ad)} // Pass ad object to handleClick function
          />
        ))}
      </div>
    </div>
  );
};

export default AdminAds;
