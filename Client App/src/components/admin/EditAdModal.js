import React from "react";

const EditAdModal = ({ isOpen, onClose, ad, onChange, onUpdate }) => {
  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? "" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative bg-white rounded-lg p-8 mx-auto max-w-lg">
          <h2 className="text-xl font-bold mb-4">Edit Ad Details</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="ad_title"
                value={ad.ad_title}
                onChange={onChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="area"
                value={ad.area.longitude}
                onChange={onChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={ad.description}
                onChange={onChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={ad.image}
                onChange={onChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={ad.price}
                onChange={onChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={onUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                Update
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAdModal;