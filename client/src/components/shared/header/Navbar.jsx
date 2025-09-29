import React, { useEffect, useState, useContext } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { menusList, socialList } from "../../constants";
import axios from "axios";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
// import logo from "../../../assets/logos/logoblack.png";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../../redux/slices/cartSlices";
import Search from "./Search";
import { MdKeyboardArrowRight, MdOutlineClose } from "react-icons/md";
import MobileSearch from "./MobileSearch";
import { TiArrowBackOutline } from "react-icons/ti";
import { PiPercentBold } from "react-icons/pi";
import logo from "../../../assets/logos/logoblack.png";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import ApiContext from "../../baseapi/BaseApi";
import Containar from "../../../layouts/Containar";
import { IoCallOutline } from "react-icons/io5";
const Navbar = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [categoryActive, setCategoryActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const baseApi = useContext(ApiContext);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const cartItems = useSelector((state) => state.cart.items);

  const toggleDrawer1 = () => {
    setIsOpenCart((prevState) => !prevState);
  };
  // Get cart items from Redux store

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseApi}/category`);
        setCategories(response.data.data.doc);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  // Calculate the total quantity of items in the cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleDelete = (id) => {};

  const calculateSubtotal = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total +
          item?.quantity *
            (item?.selectedOption?.discountValue > 0
              ? Math.ceil(item?.selectedOption?.salePrice)
              : item?.selectedOption?.price),
        0
      )
      ?.toFixed(0);
  };

  const setHandleClick = async (id) => {
    const response = await axios.get(`${baseApi}/category/${id}`);
    setData(response.data.data.doc);
    setCategoryActive(!categoryActive);
    fetchCategoryById(id);
  };
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        size={windowWidth > 400 ? 400 : 300}
        lockBackgroundScroll={true}
        className="bla bla bla"
      >
        <div className="font-inter h-screen overflow-scroll">
          <div className="py-4 px-7 flex justify-between items-center bg-primary">
            <Link className="flex items-baseline" to="/">
              <div className="flex gap-2 items-center">
                <img className="w-20" src={logo} />
              </div>
            </Link>
            <div onClick={() => toggleDrawer()}>
              <MdOutlineClose className="text-xl text-gray-600 cursor-pointer " />
            </div>
          </div>
          <div className="px-7 bg-gray-200">
            <MobileSearch toggleDrawer={toggleDrawer} />
          </div>
          <div className="border-t  border-t-border py-7 block sm:hidden">
            <h2 className="text-lg font-medium  text-texthead flex items-center justify-between  pb-5 px-7">
              Menu
              <MdOutlineClose
                onClick={() => toggleDrawer()}
                className="text-xl cursor-pointer"
              />
            </h2>
            <ul className=" flex flex-col">
              {menusList.map((item, index) => (
                <li key={index}>
                  <Link
                    className="py-3 px-8 block transition-all ease-linear duration-200 hover:bg-bestdealbg text-base font-medium  text-texthead "
                    onClick={() => toggleDrawer()}
                    to={item?.link}
                  >
                    {item?.name}
                  </Link>{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-t-border ">
            <h2 className="text-lg font-medium text-texthead  items-center justify-between hidden  pb-5 ">
              Categories
            </h2>
            <ul className=" flex  flex-col min-h-[500px] relative overflow-hidden">
              {/* {console.log("Categories:", categories)} */}
              {categories.map((category) => (
                <li
                  className="py-3.5 px-7 cursor-pointer hover:bg-bestdealbg transition-all ease-linear duration-300 flex items-center justify-between "
                  key={category._id}
                  onClick={() => setHandleClick(category._id)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={category?.photos}
                      alt={category?.title}
                      className="w-6"
                    />
                    <h4 className="text-base font-medium  text-texthead ">
                      {category?.title}
                    </h4>
                  </div>
                  <h4>
                    <MdKeyboardArrowRight className="text-xl" />
                  </h4>
                </li>
              ))}
              <li
                className={`absolute ${
                  categoryActive ? "left-0" : "left-full "
                }   transition-all duration-300 ease-in-out top-0 w-full min-h-[500px] bg-white z-20`}
              >
                <div>
                  <div className="">
                    <h4
                      onClick={() => setCategoryActive(false)}
                      className="font-medium py-3.5 px-7 text-base text-texthead flex gap-x-2 items-center cursor-pointer bg-bestdealbg"
                    >
                      <span>
                        <MdKeyboardArrowRight className="text-xl rotate-180" />
                      </span>
                      {data?.title}
                    </h4>
                    <ul className="mt-3">
                      {data?.subCategories?.map((item, index) => {
                        return (
                          <li
                            className="hover:bg-bestdealbg hover:bg-opacity-60 transition-all ease-linear duration-200"
                            key={index}
                          >
                            {" "}
                            <Link
                              onClick={() => {
                                toggleDrawer();
                                setCategoryActive(false);
                              }}
                              className="py-3.5 px-9 inline-block "
                              to={`/shop/subcategory/${
                                item?._id
                              }/${encodeURIComponent(
                                item?.title.replace(/\s+/g, "")
                              )}`}
                              // to={`/shop/subcategory/${item?._id}`}
                            >
                              {item?.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className=" border-t flex justify-center border-t-border">
            <ul className="flex items-center gap-x-5 py-7 ">
              {socialList.map((item, index) => {
                const Icon = item?.logo;
                return (
                  <li key={index}>
                    <Link
                      className="flex items-center justify-center w-10 h-10 border border-border rounded-md hover:bg-danger text-texthead transition-all ease-linear duration-200 hover:text-gray-600"
                      to={item?.link}
                    >
                      <Icon />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Drawer>
      <Drawer
        open={isOpenCart}
        onClose={toggleDrawer1}
        direction="right"
        className="bla bla bla"
        size={600}
      >
        <div className="font-inter max-h-screen">
          {/* <div className="flex justify-between items-center py-6 px-10 border-b border-b-border">
            <div className="flex items-center gap-x-5 ">
              <HiOutlineShoppingBag className="text-2xl" />
              <h3 className="text-base font-medium">
                Your shopping bag ({cartItems.length})
              </h3>
            </div>
            <div
              onClick={() => {
                toggleDrawer1();
              }}
              className="flex gap-x-2 items-center cursor-pointer group "
            >
              <h3 className="text-gray-600 group-hover:text-[#10B1DF] transition-all ease-linear duration-200 font-medium text-base">
                Close
              </h3>
              <IoClose className="text-gray-700 text-2xl group-hover:text-[#10B1DF] transition-all ease-linear duration-200 " />
            </div>
          </div> */}

          <div className="flex flex-col gap-y-5 px-10 py-7">
            {cartItems.length > 0 ? (
              <>
                <div className="flex justify-between px-10">
                  <h3 className="text-base font-medium">Subtotal</h3>
                  <h3 className="text-base text-[#10B1DF] font-medium flex items-center gap-x-1">
                    ৳ {calculateSubtotal()}
                  </h3>
                </div>
                <Link
                  onClick={toggleDrawer1}
                  className="text-base text-center rounded-sm font-medium text-texthead w-full py-5 border border-texthead hover:bg-texthead transition-all ease-linear duration-150 hover:text-gray-600"
                  to={"/cart"}
                >
                  View Cart
                </Link>
                <Link
                  onClick={toggleDrawer1}
                  className="text-base text-center rounded-sm font-medium hover:text-texthead w-full py-5 border border-texthead bg-texthead hover:bg-white text-gray-600 transition-all ease-linear duration-150"
                  to={"/checkout"}
                >
                  Checkout
                </Link>
              </>
            ) : (
              <Link
                onClick={toggleDrawer1}
                className="text-base text-center rounded-sm font-medium text-texthead w-full py-5 border border-texthead hover:bg-texthead transition-all ease-linear duration-150 hover:text-gray-600 flex gap-x-2 justify-center items-center"
                to={"/shop"}
              >
                <div className="flex items-center gap-x-2">
                  <TiArrowBackOutline className="text-xl" />
                  Back to Shop
                </div>
              </Link>
            )}
          </div>
        </div>
      </Drawer>
      <nav className="mx-auto font-inter shadow-sm bg-primary px-5 py-3 md:px-1 xl:px-0 md:pt-2 lg:pt-0">
        {/* Main Navigation */}
        <div className="relative px-2 lg:px-0">
          {/* <Containar> */}
          <div className="mx-auto max-w-[900px] lg:max-w-screen-lg xl:max-w-screen-xl">
            <div className="flex justify-between items-center">
              {/* Logo */}

              <div className="flex items-center justify-between gap-10 lg:gap-14">
                <Link to="/" className="flex items-center">
                  <div className="py-2 flex items-center">
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-28 md:w-20 xl:w-48"
                    />
                  </div>
                </Link>
                {/* Search Bar for Desktop */}
                <div className="hidden md:flex items-center border">
                  <div
                    onClick={toggleDrawer}
                    className="group flex items-center gap-x-2  px-2 xl:px-5 py-1 xl:py-2 cursor-pointer  text-gray-600"
                  >
                    {/* <HiOutlineMenuAlt1 className="text-xl lg:text-3xl group-hover:scale-110 duration-200" /> */}
                    <span className="text-sm">Categories</span>
                    <HiOutlineMenuAlt3 className="text-xl group-hover:scale-110 duration-200 group-hover:text-secendary" />
                  </div>
                </div>
              </div>

              <div className="hidden md:flex text-gray-600 font-semibold text-xl">
                {/* <Search /> */}
                Welcome To Qutex
              </div>

              <div className="hidden md:flex items-center space-x-4 text-gray-600">
                <div className="flex gap-2 xl:gap-5 items-center border-r px-2 xl:px-5">
                  <div>
                    <p className="text-sm text-gray-00 text-right">
                      Call Us Now
                    </p>
                    <a className="text-gray-600" href="tel:+8801914314909 ">
                    01914314909
                    </a>
                  </div>
                  <div className="bg-[#eaeaec] w-10 h-10 rounded-full flex items-center justify-center">
                    <IoCallOutline className="text-2xl text-gray-800" />
                  </div>
                </div>

                {/* Cart Section */}
                <Link
                  to={"/checkout"}
                  className="flex items-center  duration-200 group"
                >
                  <span className="mr-1">Cart</span>
                  <FiShoppingBag className="text-lg cursor-pointer group-hover:scale-110 duration-200" />
                  <span className="ml-1">({totalQuantity})</span>
                </Link>
              </div>

              <div
                onClick={toggleDrawer}
                className="group flex md:hidden items-center gap-x-2  px-2 xl:px-5 py-1 xl:py-2 rounded cursor-pointer border  text-gray-600"
              >
                <HiOutlineMenuAlt3 className="text-xl lg:text-3xl group-hover:scale-110 duration-200" />
                <span className="text-sm hidden lg:block">Categories</span>
                <span className="block lg:hidden">Menu</span>
              </div>
            </div>
          </div>
          {/* </Containar> */}

          <div className="border-t border-t-gray-600 py-2 hidden sm:block">
            {/* <Containar> */}
            <div className="flex justify-between max-w-[900px] lg:max-w-screen-lg xl:max-w-screen-xl  mx-auto">
              <ul className="hidden sm:flex items-center gap-x-5 xl:gap-x-10 uppercase px-5 xl:px-10 py-3">
                {menusList.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        isActive
                          ? "font-medium text-sm underline"
                          : "font-medium text-sm text-gray-600  duration-200"
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <Search />

              {/* <Link
                to="/shop"
                className="bg-secendary px-5 py-3 text-gray-200 block md:hidden lg:block"
              >
                Discount Now{" "}
                <span className="bg-white text-secendary px-5 py-1 rounded-full">
                  Sale
                </span>
              </Link> */}
            </div>
            {/* </Containar> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
