import React, { useState,useContext  } from "react";
import EditAdModal from "./EditAdModal"; // Import your modal component here
import axios from "axios";
import { LoadingContext } from '../../context/loadingContext'

const AdminCard = (props) => {
  const{reload,setReload}= useContext(LoadingContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    ad_title: props.title,
    area: props.area,
    description: props.description,
    image: props.image,
    price: props.price,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleUpdateAd = async () => {
    console.log(props.id);
    try {
      const response = await axios.put(
        `http://localhost:5001/api/admin/ads/${props.id}`,
        editForm,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Updated ad:", response.data);
      setReload(!reload)
      // Optionally update the UI or close the modal
      handleCloseModal();
    }catch (error) {
      console.error("Error updating ad:", error);
      alert("An error occurred while updating the ad.");
    }
  };

  const handleDeleteAd = async () => {
    console.log(props.id);
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/admin/ads/${props.id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReload(!reload)
      console.log("Deleted ad:", response.data);
      // Optionally update the UI or refresh data after deletion
    } catch (error) {
      console.error("Error deleting ad:", error);
      alert("An error occurred while deleting the ad.");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-md mx-auto md:mx-0">
      {props.isRented === 'true' && (
        <span className="absolute bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Rented</span>
      )}
      <div className="flex flex-col md:flex-row">
        <img
          className="object-cover w-full h-48 md:w-1/2 md:h-auto rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={props.image}
          alt="Ad"
        />
        <div className="p-4 flex flex-col justify-between">
          <h5 className="text-2xl font-bold mb-2">{props.title}</h5>
          <hr></hr>
          <p className="text-gray-700 mb-2 font-md">{props.description}</p>
          <hr></hr>
          <p className="text-gray-700 mb-2 font-bold">Address: {props.area.latitude}, {props.area.longitude}</p>
          <hr></hr>
          <p className="text-gray-700 mb-2 font-semibold">Price: {props.price} TL</p>
          <div className="flex justify-center">
            <button onClick={handleOpenModal} className="p-2 text-blue-500 hover:text-blue-700 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
            </button>
            <button onClick={handleDeleteAd} className="p-2 text-red-500 hover:text-red-700 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for editing */}
      {isModalOpen && (
        <EditAdModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          ad={editForm}
          onChange={handleChange}
          onUpdate={handleUpdateAd}
        />
      )}
    </div>
  );
};

export default AdminCard;