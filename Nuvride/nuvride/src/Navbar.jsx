import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Home, Search, CalendarCheck, MessageCircle, LogIn, LogOut,
  Heart, PlusSquare, User, Car, MoreHorizontal, Menu, X,
  UserPlus,Wallet,
  ShieldCheck
} from "lucide-react";

const Sidebar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("startDate");
    localStorage.removeItem("endDate");
    setToken(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-white bg-gray-900 p-2 rounded-md focus:outline-none"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-40 shadow-lg flex flex-col justify-between">
          <div className="flex flex-col gap-5 mt-8">
            <Link to="/" className="flex items-center gap-2 hover:text-yellow-400 transition"><Home className="w-5 h-5" />Home</Link>
            <Link to="/search" className="flex items-center gap-2 hover:text-yellow-400 transition"><Search className="w-5 h-5" />Search</Link>
            {token && (
              <div onClick={() => navigate('/chat')} className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition">
                <MessageCircle className="w-5 h-5" />Help
              </div>
            )}
            {token && (
              <div onClick={() => navigate('/myBookings')} className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition">
                <CalendarCheck className="w-5 h-5" />My Bookings
              </div>
            )}

          {token && (
              <div onClick={() => navigate('/my-rides')} className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition">
                <Car className="w-5 h-5" />My rides
              </div>
            )}
            {token && (
              <div onClick={() => navigate('')} className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition">
                <UserPlus className="w-5 h-5" />Switch to Premium
              </div>
            )}
             {token && (
              <div onClick={() => navigate('/wallett')} className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition">
                <Wallet className="w-5 h-5" />Recharge Wallet
              </div>
            )}
            <Link to="/rent-or-request" className="flex items-center gap-2 hover:text-yellow-400 transition"><PlusSquare className="w-5 h-5" />Rent/Ride</Link>
            {token && (
              <div onClick={() => navigate('/profile')} className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition">
                <User className="w-5 h-5" />Profile
              </div>
            )}
            {token && (
              <div onClick={handleLogout} className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition">
                <LogOut className="w-5 h-5" />Logout
              </div>
            )}
          </div>

          {/* Bottom links for non-authenticated users */}
          {!token && (
            <div className="flex flex-col gap-4">
              <Link to="/login" className="flex items-center gap-2 hover:text-yellow-400 transition"><LogIn className="w-5 h-5" />Login</Link>
              <Link to="/signup" className="flex items-center gap-2 hover:text-yellow-400 transition"><UserPlus className="w-5 h-5" />Signup</Link>
              <Link to="/admin" className="flex items-center gap-2 hover:text-yellow-400 transition"><ShieldCheck className="w-5 h-5"/>Admin</Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
