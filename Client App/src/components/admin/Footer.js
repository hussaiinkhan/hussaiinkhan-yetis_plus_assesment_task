import React from 'react';
import { Link  } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">yetiş<span className="text-[/fad71a]">+</span> çarşı</h2>
          <p className="text-sm">Your trusted marketplace for buying and selling properties.</p>
        </div>
        <div className="text-center">
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-[/fad71a]">Home</Link></li>
            <li><Link to="/" className="hover:text-[/fad71a]">About Us</Link></li>
            <li><Link to="/" className="hover:text-[/fad71a]">Contact</Link></li>
            <li><Link to="/" className="hover:text-[/fad71a]">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="text-sm">&copy; 2024 yetiş<span className="text-[/fad71a]">+</span> çarşı. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
