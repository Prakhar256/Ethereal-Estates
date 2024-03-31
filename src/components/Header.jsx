import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Logo from "./FinalLogo.png"
export default function Header() {
    const [pageState, setPageState]=useState("Sign in")
    const location=useLocation();
    const navigate=useNavigate();

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
    function pathMatchRoute(route) {
        if (route === location.pathname) {
          return true;
        }
      }
    return (
<div className="bg-white border-b shadow-sm sticky top-0 z-40" style={{backgroundColor: "rgb(230, 255, 250)"}}>
          <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
            <div>
              <img
                src={Logo}
                alt="logo"
                className="h-14 cursor-pointer"
                onClick={() => navigate("/")}
                height={50}
                width={300}
              />
            </div>
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