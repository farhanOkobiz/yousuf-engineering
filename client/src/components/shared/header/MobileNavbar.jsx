import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { menusList, socialList } from "../../constants";
import axios from "axios";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import logo from "../../../assets/logos/logoblack.png";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../../redux/slices/cartSlices";
import Search from "./Search";
import MobileSearch from "./MobileSearch";
import { MdKeyboardArrowRight, MdOutlineClose } from "react-icons/md";
import { PiPercentBold } from "react-icons/pi";
import { TiArrowBackOutline } from "react-icons/ti";
import ApiContext from "../../baseapi/BaseApi";
import { useContext } from "react";
import Containar from "../../../layouts/Containar";

const MobileNavbar = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  const [data, setData] = useState({});
  const [categoryActive, setCategoryActive] = useState(false);
  const [isFixed, setIsFixed] = useState(false); // State for fixed navbar
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseApi = useContext(ApiContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Log the width whenever it changes
    // console.log("Current window width:", windowWidth);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const cartItems = useSelector((state) => state.cart.items);

  const toggleDrawer1 = () => {
    setIsOpenCart((prevState) => !prevState);
  };

  // console.log(data, ".............data...........");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // console.log("............clg");
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
    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data.reverse());
      } catch (error) {
        // console.error(error);
      }
    }
    fetchProducts();
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setHandleClick = async (id) => {
    const response = await axios.get(`${baseApi}/category/${id}`);
    setData(response.data.data.doc);
    // console.log(data, ".............data.....");
    // console.log(id);
    setCategoryActive(!categoryActive);
    fetchCategoryById(id);
  };

  // console.log(cartItems, "...........>>>>>>>>>");

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
              <MdOutlineClose className="text-xl text-grey-600 cursor-pointer " />
            </div>
          </div>
          {/* <Link className="flex items-baseline" to={"/"}>
              <div className="mb-2 w-10 xl:w-40 ">
                <img className="w-full" src={logo} />
              </div>
            </Link>
            <div onClick={() => toggleDrawer()}>
              <MdOutlineClose className="text-xl  cursor-pointer mt-2" />
            </div> */}

          <div className="px-7">
            <MobileSearch toggleDrawer={toggleDrawer} />
          </div>
          <div className="border-t  border-t-border py-7 block sm:hidden">
            <h2 className="text-lg font-medium   flex items-center justify-between  pb-5 px-7">
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
                    className="py-3 px-8 block transition-all ease-linear duration-200 hover:bg-bestdealbg text-base font-medium   "
                    onClick={() => toggleDrawer()}
                    to={item?.link}
                  >
                    {item?.name}
                  </Link>{" "}
                </li> // Adjust based on the structure of the category data
              ))}
            </ul>
          </div>

          <div className="border-t border-t-border ">
            <h2 className="text-lg font-medium   items-center justify-between hidden  pb-5 ">
              Categories
            </h2>
            <ul className=" flex  flex-col min-h-[500px] relative overflow-hidden">
              {categories?.map((category) => (
                <li
                  className="py-3.5 px-7 cursor-pointer hover:bg-bestdealbg transition-all ease-linear duration-300 flex items-center justify-between "
                  key={category?._id}
                  onClick={() => setHandleClick(category?._id)}
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
                      className="font-medium py-3.5 px-7 text-base  flex gap-x-2 items-center cursor-pointer bg-bestdealbg"
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
                              // to={`/shop/category/${item?._id}`}
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
        </div>
      </Drawer>
      <Drawer
        open={isOpenCart}
        onClose={toggleDrawer1}
        direction="right"
        className="bla bla bla"
        size={600}
      >
        <div className="font-inter max-h-screen overflow-y-scroll">
          <div className="flex justify-between items-center py-6 px-10 border-b border-b-border">
            {/* <div className="flex items-center gap-x-5 ">
              <HiOutlineShoppingBag className="text-2xl" />
              <h3 className="text-base font-medium">
                Your shopping bag ({cartItems?.length})
              </h3>
            </div> */}
            <div
              onClick={() => {
                toggleDrawer1();
              }}
              className="flex gap-x-2 items-center cursor-pointer group "
            >
              <h3 className="text-gray-600 group-hover:text-danger transition-all ease-linear duration-200 font-medium text-base">
                Close
              </h3>
              <IoClose className="text-gray-700 text-2xl group-hover:text-danger transition-all ease-linear duration-200 " />
            </div>
          </div>

          {/* <div className="flex flex-col gap-y-5 px-10 py-7">
            {cartItems.length > 0 ? (
              <>
                <div className="flex justify-between px-10 ">
                  <h3 className="text-base font-medium">Subtotal</h3>
                  <h3 className="text-base text-green-600 font-medium flex items-center gap-x-1">
                    ৳ {calculateSubtotal()}
                  </h3>
                </div>
                <Link
                  onClick={toggleDrawer1}
                  className="text-base text-center rounded-sm font-medium  w-full py-5 border border-texthead hover:bg-texthead transition-all ease-linear duration-150 hover:text-grey-600"
                  to={"/cart"}
                >
                  View Cart
                </Link>
                <Link
                  onClick={toggleDrawer1}
                  className="text-base text-center rounded-sm font-medium hover: w-full py-5 border border-texthead bg-texthead hover:bg-white text-grey-600 transition-all ease-linear duration-150"
                  to={"/checkout"}
                >
                  Checkout
                </Link>
              </>
            ) : (
              <Link
                onClick={toggleDrawer1}
                className="text-base text-center rounded-sm font-medium  w-full py-5 border border-texthead hover:bg-texthead transition-all ease-linear duration-150 hover:text-grey-600 flex gap-x-2 justify-center items-center"
                to={"/shop"}
              >
                <div className="flex items-center gap-x-2">
                  <TiArrowBackOutline className="text-xl" />
                  Back to Shop
                </div>
              </Link>
            )}
          </div> */}
        </div>
      </Drawer>
      <nav
        className={`fixed w-full bg-primary z-50 font-inter transition-all duration-300 ease-in-out py-5 sm:py-0 shadow-xl ${
          isFixed ? "top-0 " : "-top-[200px] "
        } mx-auto px-4 sm:px-14   `}
      >
        {/* Main Navigation */}
        <div className="px-5">
          {/* <Containar> */}
          <div className="mx-auto max-w-[900px] lg:max-w-screen-xl">
            <div className="flex flex-wrap justify-between items-center">
              {/* Logo */}
              <div
                onClick={toggleDrawer}
                className="group flex items-center gap-x-2 border px-2 lg:px-5 py-2 rounded cursor-pointer text-gray-200 border-secendary bg-secendary"
              >
                <span className="text-sm ">Categories</span>
                <HiOutlineMenuAlt3 className="text-xl lg:text-3xl group-hover:scale-110 duration-200" />
              </div>
              {/* <div className="text-3xl font-bold text-gray-800">
                  <a href="#" className="flex items-center">
                    <img
                      src={logo}
                      alt=""
                      className="w-24  lg:w-40 lg:h-20 object-contain"
                    />
                  </a>
                </div> */}

              <ul className="hidden sm:flex items-center gap-x-7 xl:gap-x-10 py-8">
                {menusList.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        isActive
                          ? " font-medium text-sm underline"
                          : "font-medium text-sm   duration-200 text-grey-600"
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="flex items-center space-x-4 text-gray-300">
                {/* Search Bar for Desktop */}
                <div className="lg:block hidden">
                  <Search />
                </div>

                {/* Cart Section */}
                <Link
                  to={"/checkout"}
                  className="flex items-center  duration-200 group"
                >
                  <span className="mr-1 text-gray-600">Cart</span>
                  {/* <FiShoppingBag className="text-lg cursor-pointer group-hover:scale-110 duration-200" /> */}
                  <span className="ml-1 text-gray-600">({totalQuantity})</span>
                </Link>
              </div>
            </div>
          </div>
          {/* </Containar> */}
        </div>
      </nav>
    </>
  );
};

export default MobileNavbar;
