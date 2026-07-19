import { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <div className="relative flex justify-between items-center py-1 mx-4 sm:mx-10 xl:mx-22 px-4 sm:px-8">
      <img
        onClick={() => navigate("/home")}
        src={assets.logo}
        alt="logo"
        className="w-16 sm:w-22 cursor-pointer"
      />

      <div className="hidden sm:flex items-center gap-4">
        {user ? (
          <>
            {isAdmin && (
              <button
                onClick={() => navigate("/admin")}
                className="rounded-2xl text-sm border border-primary text-primary px-5 py-2.5 hover:bg-primary/5 transition"
              >
                Admin Panel
              </button>
            )}
            <span className="text-sm text-gray-600 hidden md:inline">
              Hi, {user.name || user.email}
            </span>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-2xl text-sm bg-red-500 text-white px-6 py-2.5 hover:opacity-90 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 rounded-2xl text-sm bg-primary text-white px-6 py-2.5 hover:opacity-90 transition"
            >
              Login
              <img src={assets.arrow} alt="" className="w-3" />
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 rounded-2xl text-sm bg-primary text-white px-6 py-2.5 hover:opacity-90 transition"
            >
              Sign Up
              <img src={assets.arrow} alt="" className="w-3" />
            </button>
          </>
        )}
      </div>

      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
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

      {menuOpen && (
        <div className="absolute top-12 left-0 w-full bg-white shadow-md flex flex-col items-center gap-3 py-4 sm:hidden z-50">
          {user ? (
            <>
               <p className="text-sm text-gray-600">
          Hi, {user.name || user.email}
        </p>
              {isAdmin && (
                <button
                  onClick={() => {
                    navigate("/admin");
                    setMenuOpen(false);
                  }}
                  className="w-4/5 border border-primary text-primary py-2 rounded-lg"
                >
                  Admin Panel
                </button>
              )}
              <button
                onClick={handleLogout}
                className="w-4/5 bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="w-4/5 bg-primary text-white py-2 rounded-lg"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
                className="w-4/5 bg-primary text-white py-2 rounded-lg"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
