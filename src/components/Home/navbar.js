

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <nav className="fixed top-0 w-screen md:full bg-blue-700 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-2xl font-bold">
            Drive and Dive Motors
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
            <Link to="#Products" className="hover:text-yellow-300 transition duration-300">Boats</Link>
            <Link to="/#vehicles" className="hover:text-yellow-300 transition duration-300">Vehicles</Link>
            <Link to="/#motors" className="hover:text-yellow-300 transition duration-300">Motors</Link>
            <Link to="/#contact" className="hover:text-yellow-300 transition duration-300">Contact Us</Link>
          </div>

          {/* Dropdown for "Get Started" */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents document click event from closing the dropdown immediately
                toggleDropdown();
              }}
              className="hidden md:inline-flex bg-yellow-500 text-teal-700 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Get Started
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-teal-700 rounded-md shadow-lg z-20">
                <Link
                  to="/Login"
                  className="block px-4 py-2 hover:bg-gray-200 transition duration-300"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/Signup"
                  className="block px-4 py-2 hover:bg-yellow-300 transition duration-300"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-yellow-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-teal-700 px-4 py-2 space-y-2">
          <Link to="/" className="block text-white hover:text-yellow-300" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/boats" className="block text-white hover:text-yellow-300" onClick={toggleMenu}>
           Events
          </Link>
          <Link to="/vehicles" className="block text-white hover:text-yellow-300" onClick={toggleMenu}>
            Testmonials
          </Link>
          <Link to="/motors" className="block text-white hover:text-yellow-300" onClick={toggleMenu}>
            Our Services
          </Link>
          <Link to="/contact" className="block text-white hover:text-yellow-300" onClick={toggleMenu}>
            Contact Us
          </Link>
          < button className="w-full bg-yellow-500 text-teal-700 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition duration-300" onClick={toggleMenu}>
           <Link to="/Login" className="block text-teal-700 hover:text-gray-600" >
            Sign In
          </Link>
          </button>
          <button className="w-full bg-yellow-500 text-teal-700 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition duration-300" onClick={toggleMenu}>
          <Link to="/SignUp" className="block text-teal-700 hover:text-gray-600" >
            Sign Up
          </Link>
          </button>
        </div>
      )}
    </nav>

    //Into


  );
};

export default Navbar;
