import React from 'react'
import { Link } from 'react-scroll';
import { Link as Link2 } from "react-router-dom";
const ClientHero = () => {
  return (
    <div className='w-full mx-auto  h-screen  flex flex-col justify-center bg-gray-900 text-white' style={{ backgroundImage: 'url(https://img.freepik.com/premium-vector/vector-hand-drawn-delicious-restaurant-food-background-pattern_690073-151.jpg?w=1380)' }}>
      {/* Heading in the top right corner */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 text-3xl md:text-4xl font-bold">
        yetiş<span className='text-[#fad71a]'>+</span> çarşı
      </div>
      <Link2 to="/">
      <div className="absolute top-4 right-4 md:top-6 md:right-6 text-3xl md:text-4xl font-bold">
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
          />
        </svg>
        
      </div>
      </Link2> 
        <div className="flex  items-center justify-center bg-[#26ac81] bg-opacity-80 text-white w-full h-screen">
            <div className='flex flex-col items-center text-center'>
                <h1 className="text-6xl md:text-8xl font-bold ">Welcome!</h1>
                <h1 className="text-4xl md:text-6xl  font-bold mb-4">yetiş<span className='text-4xl md:text-6xl font-bold text-[#fad71a]'>+</span> çarşı</h1>
                <p className=" text-sm md:text-2xl font-md mb-8">Find your perfect place—home or office—with Yetiş+ Çarşı. Discover top rental properties effortlessly!</p>
                <Link
                    to="clientads"
                    smooth={true}
                    duration={500}
                >
                <button className='font-bold px-3 py-4 rounded-lg bg-white text-[#26ac81] p-2  hover:bg-[#fad71a]'>Look for properties</button>
                </Link>
            </div>
        </div>
    </div>

  )
}

export default ClientHero