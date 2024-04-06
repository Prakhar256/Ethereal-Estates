import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Logo from "./FinalLogo.png"
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
export default function Header() {
    const [pageState, setPageState]=useState("Sign in")
    const location=useLocation();
    const navigate=useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const auth=getAuth();
    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          setPageState("Profile");
        }
        else{
          setPageState("Sign in");
        }
      })
    });
    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);
    function pathMatchRoute(route) {
        if (route === location.pathname) {
          return true;
        }
      }
    return (
      <div className="bg-white border-b shadow-sm sticky top-0 z-40" >
          <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
            <div>
              {/* <img
                src={Logo}
                alt="logo"
                className="h-14 cursor-pointer"
                onClick={() => navigate("/")}
                height={50}
                width={300}
              /> */}
              <Link to='/'>
              <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Ethereal </span>
                <span className='text-slate-700 ml-1'> Estates</span>
              </h1>
              </Link>

            </div>
            <form onSubmit={handleSubmit} className='bg-white p-3 rounded-lg flex items-center'>
            <input
            type='text'
            placeholder='Search...'
            className='bg-transparent border rounded-lg focus:outline-none w-24 sm:w-64 '
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='ml-3'>
            <FaSearch className='text-slate-600' />
          </button>
            </form>
            <div>
              <ul className="flex space-x-10">
                <li
                  className={`cursor-pointer py-3 text-sm font-semibold text-black-400 border-b-[3px] ${
  pathMatchRoute("/") && "text-black border-b-red-500 transition-all duration-500 ease-in-out "
}`}

                  onClick={() => navigate("/")}
                >
                  Home
                </li>

                <li
                  className={`cursor-pointer py-3 text-sm font-semibold text-black-400 border-b-[3px]  ${
                    pathMatchRoute("/offers") && "text-black border-b-red-500 transition-all duration-500 ease-in-out"
                  }`}
                  onClick={() => navigate("/offers")}
                >
                  Offers
                </li>
                <li
                  className={`cursor-pointer py-3 text-sm font-semibold text-black-400 border-b-[3px]  ${
                    (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                    "text-black border-b-red-500 transition-all duration-500 ease-in-out"
                  }`}
                  onClick={() => navigate("/profile")}
                >
                    {pageState}
                </li>
              </ul>
            </div>
          </header>
        </div>
      );
}