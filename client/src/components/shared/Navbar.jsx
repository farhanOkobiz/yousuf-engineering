/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Containar from "../containar/Containar";
import logo from "../../assets/logo/yousuf-logo.png";
import { Link, NavLink, matchPath } from "react-router-dom";
import { menulist } from "../constants";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { IoReorderThree } from "react-icons/io5";
import api from "../axios/Axios";
import NavberDrawer from "../Drawer/NavberDrawer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSticky, setIsSticky] = useState(false); // New state for sticky navbar

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const agroCart = useSelector((state) => state.agroCart);
  const totalItems = agroCart.reduce((total, item) => total + item.quantity, 0);
  const isTon = totalItems >= 1000; // Determine if total quantity exceeds 1000
  const displayQuantity = isTon
    ? (totalItems / 1000).toFixed(2) // Convert to Tons and format to 2 decimals
    : totalItems;
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await api.get("/users/getMe", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data.data.doc);
        } catch (error) {
          // Handle error (optional)
        }
      } else {
        // Clear user data if token is not available
        setUserData(null);
      }
    };

    fetchUserData();
  }, [token]);

  // Add scroll event listener to update sticky state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isShopDrawerOpen, setShopDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setShopDrawerOpen((prevState) => !prevState);
  };

  const isShopPage =
    matchPath({ path: "/shop", end: true }, location.pathname) ||
    matchPath({ path: "/shop/:slug", end: true }, location.pathname);

  return (
    <nav
      className={`transition-all duration-300 ease-in-out ${isSticky ? "bg-white" : "sm:bg-[rgba(0,0,0,0.11)] sm:backdrop-blur-[3%]"
        } z-[9999] font-robo fixed left-0 top-0 w-full`}
    >
      <Containar>
        <div className="py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex gap-x-3 items-center">
                <div className="h-[50px]">

                  <Link to={"/"}>
                    <img className="w-full h-full" src={logo} alt="Logo" />
                  </Link>
                </div>
                {/* <div>
                  <Link
                    to={"/"}
                    className="text-[13px] md:text-[18px] xl:text-[24px] font-bold text-white"
                  >
                    Yousuf Engineering
                  </Link>
                </div> */}
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center gap-x-3 xl:gap-x-10">
              <ul className="flex space-x-4">
                {menulist.map((item, index) => (
                  <li key={index} className="flex">
                    {item?.title === "Hotline" ? (
                      <a
                        href={item?.link}
                        className="bg-red-500 text-white text-[14px] xl:text-[16px] font-bold px-4 py-2 rounded hover:bg-red-600 transition-all ease-linear duration-150 flex flex-col items-center"
                      >
                        <div className="flex">
                          {item?.icon && <item.icon className="mr-2" />}
                          {item?.title}
                        </div>
                        <span className="hidden lg:block">01714028279</span>
                      </a>
                    ) : (
                      <NavLink
                        to={item?.link}
                        className={({ isActive }) =>
                          isActive
                            ? `text-primary text-[14px] xl:text-[16px] font-bold px-4 py-2 rounded hover:text-primary transition-all ease-linear duration-150 flex items-center`
                            : `${isSticky ? "text-gray-700" : "text-white"
                            }  text-[14px] xl:text-[16px] font-bold px-4 py-2 rounded hover:text-primary transition-all ease-linear duration-150 flex items-center`
                        }
                      >
                        {item?.title}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
              {/* <ul className="flex items-center gap-x-3">
                {isShopPage && (
                  <li className="text-white text-[24px]">
                    <Link to="/shoping-cart">
                      <div className="flex items-center gap-x-2">
                        <HiOutlineShoppingBag className="text-secondary" />
                        <div className="text-sm uppercase">
                          {displayQuantity} {isTon ? "Ton" : "Kg"}
                        </div>
                      </div>
                    </Link>
                  </li>
                )}
                {userData?.photo ? (
                  <li className="text-white w-8 h-8 mt-1 rounded-full relative">
                    <Link
                      className="block w-full h-full rounded-full"
                      to="/profile"
                    >
                      <img
                        className="w-full h-full rounded-full"
                        src={userData?.photo}
                        alt="User"
                      />
                    </Link>
                  </li>
                ) : (
                  <li className="text-white text-[20px] relative">
                    <Link className="block" to="/profile">
                      <FaUser />
                    </Link>
                  </li>
                )}
              </ul> */}
            </div>
            <div className="block lg:hidden">
              <ul className="flex items-center gap-x-2">
                <li className="text-white text-[20px] relative">
                  <IoReorderThree
                    onClick={toggleDrawer}
                    className={`block lg:hidden text-gray-400 text-3xl `}
                  />
                </li>
              </ul>
            </div>
          </div>

          {/* sm navbar */}
          {/* <div className="relative lg:hidden">
            <div
              onClick={toggleNavbar}
              className={`fixed top-0 right-0 w-2/3 md:w-80 bg-white z-50 transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300 ease-in-out lg:hidden`}
            >
              <div className="flex justify-between px-8 my-12">
                <img className="w-[50px] h-[50px]" src={logo} alt="Logo" />
                <RxCross2 className="w-[32px] h-[32px] p-1 font-extrabold bg-green-500 rounded text-white" />
              </div>
              <ul className="my-8 h-screen space-y-4 px-8">
                {menulist.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item?.link}
                      className={({ isActive }) =>
                        isActive
                          ? "text-secondary text-[17px] font-bold relative before:bg-secondary before:absolute before:contents-[] before:left-0 before:-bottom-3 before:w-full before:h-[2px]"
                          : "text-black text-[17px] relative before:bg-secondary before:absolute before:contents-[] before:right-0 before:-bottom-3 before:w-[0px] hover:before:w-full before:h-[2px] font-bold hover:text-secondary hover:before:left-0 transition-all ease-linear duration-150 before:transition-all before:ease-linear before:duration-100"
                      }
                    >
                      {item?.title}
                    </NavLink>
                    <hr className="mt-2" />
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* Drawer */}
          <NavberDrawer
            menulist={menulist}
            isShopDrawerOpen={isShopDrawerOpen}
            toggleDrawer={toggleDrawer}
          ></NavberDrawer>
          {/* Drawer */}
          {/*  */}
        </div>
      </Containar>
    </nav>
  );
};

export default Navbar;
