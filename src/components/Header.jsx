import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../media/logo.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
            className="h-5 cursor-pointer "
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              onClick={() => navigate("/")}
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-red-500"
              }`}
            >
              Home
            </li>
            <li
              onClick={() => navigate("/offers")}
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-black border-b-red-500"
              }`}
            >
              Offers
            </li>

            <li
              onClick={() => navigate("/profile")}
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "text-black border-b-red-500"
              }`}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
