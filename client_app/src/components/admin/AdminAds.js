import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AdminCard from './AdminCard';
import { LoadingContext } from '../../context/loadingContext';

const AdminAds = (props) => {
  const { reload } = useContext(LoadingContext);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://hussaiinkhan-yetis-plus-assesment-task-xnp6.vercel.app/api/admin/ads', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAds(response.data);
      } catch (error) {
        setError('Failed to fetch ads');
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [reload]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div name='adminads' className="flex flex-col px-4 justify-center items-center h-full bg-[#fad71a] bg-opacity-10">
      <h2 className="text-5xl mt-12 font-semibold mb-6">Your Created Ads</h2>
      {ads.length === 0 ? (
        <p className="text-2xl font-semibold mt-2 mb-12">No ads posted by you</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {ads.map(ad => (
            <AdminCard
              key={ad._id}
              image={ad.image}
              title={ad.ad_title}
              description={ad.description}
              area={ad.area}
              price={ad.price}
              id={ad._id}
              isRented={ad.is_rent}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAds;
