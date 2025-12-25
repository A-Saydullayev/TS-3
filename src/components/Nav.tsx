import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Logo
            </NavLink>
          </div>
          <nav className="hidden md:flex items-center space-x-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-semibold text-base transition-all duration-200 px-4 py-2 rounded-lg ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-semibold text-base transition-all duration-200 px-4 py-2 rounded-lg ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/actions"
              className={({ isActive }) =>
                `font-semibold text-base transition-all duration-200 px-4 py-2 rounded-lg ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`
              }
            >
              Faq
            </NavLink>

            <NavLink
              to="/reviews"
              className={({ isActive }) =>
                `font-semibold text-base transition-all duration-200 px-4 py-2 rounded-lg ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`
              }
            >
              Help
            </NavLink>

            <NavLink
              to="/support"
              className={({ isActive }) =>
                `font-semibold text-base transition-all duration-200 px-4 py-2 rounded-lg ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`
              }
            >
              Phone
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Nav;
