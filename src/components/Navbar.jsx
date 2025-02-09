import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../store/emailSlice';

const Navbar = ({ setSelectedFilter, setShowBody }) => {

  const [selected, setSelected] = useState('');

const dispatch = useDispatch()


  const handleClick = (filter) => {
    // setSelected(filter);
    // setSelectedFilter(filter);

  };
  // md:flex md:flex-row md:space-x-5
  return (
    <>
      <nav className="p-5 fixed top-0 left-0 bg-[#f4f5f9] w-full z-50">
        <div className="flex flex-row space-x-4 items-center">
          <span className="font-bold">Filter By:</span> 
          <ul className=" sm:flex sm:flex-row sm:space-x-5 grid grid-cols-2 items-center justify-center">
          <li 
              onClick={() => {
                dispatch(setCategory('all'))
                setShowBody(false)
              }}
              className={`cursor-pointer text-lg rounded-full px-3 py-2 hover:text-black ${
                selected === 'all' ? 'bg-gray-200' : ''
              }`}
            >
              All
            </li>
            <li 
              onClick={() => {
                dispatch(setCategory('read'))
                setShowBody(false)
              }}
              className={`cursor-pointer text-lg rounded-full px-3 py-2 hover:text-black ${
                selected === 'read' ? 'bg-gray-200' : ''
              }`}
            >
              Read
            </li>
            <li
              onClick={() => {
                setShowBody(false)
                dispatch(setCategory('unread'))
              }}
              className={`cursor-pointer text-lg rounded-full py-2 px-3 hover:text-black ${
                selected === 'unread' ? 'bg-gray-200' : ''
              }`}
            >
              Unread
            </li>
            <li
              onClick={() => {
                dispatch(setCategory('fav'))
                setShowBody(false)
              }}
              className={`cursor-pointer text-lg rounded-full py-2 px-3 hover:text-black ${
                selected === 'fav' ? 'bg-gray-200' : ''
              }`}
            >
              Favourite
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
