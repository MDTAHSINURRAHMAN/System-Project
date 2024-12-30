import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logo from "../assets/Logo/logo-2.png";

const MainLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state added
  const navigate = useNavigate();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false when user is fetched
    });
    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Animation settings
  const [ref, inView] = useInView({ triggerOnce: true });
  const navAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Show Loading Spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#C52546]"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <motion.div
        ref={ref}
        variants={navAnimation}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="navbar bg-base-100 max-w-7xl mx-auto"
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#C52546] font-bold text-sm tracking-[0.1rem] border-none py-2 px-7 text-white"
                      : "text-[#373737] font-bold text-sm tracking-[0.1rem]"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pets"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#C52546] font-bold text-sm tracking-[0.1rem] border-none py-2 px-7 text-white"
                      : "text-[#373737] font-bold text-sm tracking-[0.1rem]"
                  }
                >
                  Adopt
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-pet"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#C52546] font-bold text-sm tracking-[0.1rem] border-none py-2 px-7 text-white"
                      : "text-[#373737] font-bold text-sm tracking-[0.1rem]"
                  }
                >
                  Add Pet
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/volunteer-register"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#C52546] font-bold text-xs tracking-[0.1rem] border-none py-2 px-5 text-white"
                      : "text-[#373737] font-bold text-xs tracking-[0.1rem]"
                  }
                >
                  Be Our Volunteer
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={user ? `/user/chat/${user.uid}` : "/login"} // Use dynamic user ID
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#C52546] font-bold text-xs tracking-[0.1rem] border-none py-2 px-5 text-white"
                      : "text-[#373737] font-bold text-xs tracking-[0.1rem]"
                  }
                >
                  Chat
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img className="w-24 md:w-16" src={logo} alt="Logo" />
            <div className="hidden md:block">
              <p className="chewy text-2xl mb-0 tracking-[0.2rem] text-[#C52546]">
                <span>Pawfect</span>
              </p>
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-3">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#C52546] font-bold text-xs tracking-[0.1rem] border-none py-2 px-5 text-white"
                    : "text-[#373737] font-bold text-xs tracking-[0.1rem]"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pets"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#C52546] font-bold text-xs tracking-[0.1rem] border-none py-2 px-5 text-white"
                    : "text-[#373737] font-bold text-xs tracking-[0.1rem]"
                }
              >
                Adopt
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-pet"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#C52546] font-bold text-xs tracking-[0.1rem] border-none py-2 px-5 text-white"
                    : "text-[#373737] font-bold text-xs tracking-[0.1rem]"
                }
              >
                Add Pet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/volunteer-register"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#C52546] font-bold text-xs tracking-[0.1rem] border-none py-2 px-5 text-white"
                    : "text-[#373737] font-bold text-xs tracking-[0.1rem]"
                }
              >
                Be Our Volunteer
              </NavLink>
            </li>
            <li>
              <NavLink
                to={user ? `/user/chat/${user.uid}` : "/login"} // Use dynamic user ID
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#C52546] font-bold text-xs tracking-[0.1rem] border-none py-2 px-5 text-white"
                    : "text-[#373737] font-bold text-xs tracking-[0.1rem]"
                }
              >
                Chat
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <>
              <Link
                to="/register"
                className="py-2 px-6 racking-[0.1rem] font-bold rounded bg-[#151515] text-white mr-2"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="py-2 px-6 tracking-[0.1rem] font-bold text-white bg-[#C52546] rounded"
              >
                Sign In
              </Link>
            </>
          ) : (
            <>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2"
                />
              ) : (
                <span className="mr-2">{user.email}</span>
              )}
              <button onClick={handleLogout} className="btn btn-error">
                Logout
              </button>
            </>
          )}
        </div>
      </motion.div>
      {/* Render child routes */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
