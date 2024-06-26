import React from "react";

const ClientCard = (props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-md mx-auto md:mx-0 overflow-hidden relative">
      {props.isRented === 'true' && (
        <span className="absolute  bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Rented</span>
      )}
      <div className="flex flex-col md:flex-row">
        <img
          className="object-cover w-full h-48 md:w-1/2 md:h-auto rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={props.image}
          alt="Ad"
        />
        <div className="p-4 flex flex-col justify-between ">
          <h5 className="text-2xl font-bold mb-2 ">{props.title}</h5>
          <hr></hr>
          <p className="text-gray-700 mb-2 font-md ">{props.description}</p>
          <hr></hr>
          <p className="text-gray-700 mb-2 font-bold ">Address: {props.area.longitude}</p>
          <hr></hr>
          <p className="text-gray-700 mb-2 font-semibold ">Price: {props.price} TL</p>
          <div className="p-2">
            <button disabled={props.isRented === 'true'} onClick={props.handleClick} className={`font-bold bg-[#26ac81] text-white px-6 py-2 rounded-lg ${props.isRented==='false'?'hover:bg-[#fad71a]':''}`}>Rent</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
