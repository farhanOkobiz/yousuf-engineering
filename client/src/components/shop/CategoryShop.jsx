/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoCart } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import {
  FaBangladeshiTakaSign,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
} from "react-icons/fa6";
import api from "../axios/Axios";
import { useDispatch, useSelector } from "react-redux";
import { addToAgroCart } from "../../redux/slices/cart/agroCartSlice";
import SortOption from "./SortOption";
import ShopDrawer from "../Drawer/ShopDrawer";

const CategoryShop = () => {
  const [productsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [gridOrList, setGridOrList] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { selectedRange, minPrice, maxPrice } = useSelector(
    (state) => state.priceRange
  );
  const sortOption = useSelector((state) => state.sort.sortOption);

  const handleAddtoCart = (product) => {
    dispatch(addToAgroCart({ ...product, quantity: 1 }));
  };
  const handleBuyNow = (product) => {
    dispatch(addToAgroCart({ ...product, quantity: 1 }));
    // if (token) {
    //   navigate("/checkout");
    // } else {
    //   navigate("/login");
    // }
    navigate(`/checkout/${product?._id}`);
  };

  // console.log(location);
  const lastSlug = location.pathname.split("/").pop();

  // console.log("lastSlug", lastSlug);
  // Fetch products function
  const fetchProducts = async (page, limit) => {
    try {
      let sort = "";
      // Determine the sort parameter based on the selected sortOption
      if (sortOption === "lowToHigh") {
        sort = "price"; // Ascending order of price
      } else if (sortOption === "highToLow") {
        sort = "-price"; // Descending order of price
      }
      const response = await api.get(`/category/${lastSlug}/products`, {
        params: {
          limit: limit,
          page: page,
          "price[gte]": selectedRange[0],
          "price[lte]": selectedRange[1],
          sort,
        },
      });
      console.log("response === ", response.data);
      setTotalProducts(response.data.totalData); // Update total products
      return response.data.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Handle errors gracefully
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts(currentPage, productsPerPage);
      setProducts(productsData);
    };

    loadProducts();
  }, [currentPage, productsPerPage, lastSlug, selectedRange, sortOption]);

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const [isShopDrawerOpen, setShopDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setShopDrawerOpen((prevState) => !prevState);
  };

  let sortedProducts = [...products];

  if (sortOption === "lowToHigh") {
    sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortOption === "highToLow") {
    sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  return (
    <>
      <div className="py-4 font-robo md:px-5 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setGridOrList(true)}
            className={`w-9 h-9 ${gridOrList
              ? "bg-primary text-white"
              : "bg-transparent border text-text"
              } flex cursor-pointer justify-center items-center`}
          >
            <BsGrid3X3GapFill className="w-5 h-5" />
          </div>
          <div
            onClick={() => setGridOrList(false)}
            className={`w-9 h-9 border flex ${!gridOrList
              ? "bg-primary text-white"
              : "bg-transparent border text-text"
              } cursor-pointer justify-center items-center`}
          >
            <FaList className="w-5 h-5" />
          </div>
          <div className="w-9 h-9 border flex  bg-primary text-white cursor-pointer justify-center items-center md:hidden">
            <FaFilter onClick={toggleDrawer} className="w-5 h-5" />
          </div>
        </div>
        <SortOption />
      </div>

      {gridOrList ? (
        <div className="mt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 w-full px-5 pb-6">
            {sortedProducts?.map((product, index) => (
              <div
                key={index}
                className="rounded-lg hover:shadow-lg overflow-hidden bg-white group pb-4 border"
              >
                <div className="relative">
                  <div className="h-[300px] overflow-hidden">
                    <Link to={`/shop/${product?.slug}`}>
                      <img
                        src={product?.photos[0]}
                        alt={product?.title}
                        className="w-full group-hover:scale-105 transition-all ease-linear duration-300 h-full group rounded-none object-cover"
                      />
                    </Link>
                  </div>
                  {/* <div className="bg-primary group-hover:bg-secondary group-hover:text-primary border-primary border-2 transition-all ease-linear duration-150 text-white absolute right-4 -bottom-7 rounded-full border-4 border-white flex justify-center items-center w-16 h-16">
                    <p className="text-base uppercase font-medium">
                      {product?.size}
                    </p>
                  </div> */}
                </div>
                <div className="px-4 ">
                  <h2 className="font-medium line-clamp-3  hover:underline hover:text-blue-700  text-[0.75rem] md:text-[1rem] mt-7 mb-2 capitalize">
                    <Link to={`/shop/${product?.slug}`}>{product?.title}</Link>
                  </h2>
                  {product?.price && (
                    <p className="flex items-center text-[0.75rem] md:text-[1rem] font-bold text-[#00AEEF]  mt-5">
                      <FaBangladeshiTakaSign className="mr-1" />
                      {product?.price}
                    </p>
                  )}

                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="px-5 rounded-md py-1.5 text-[14px] font-medium bg-primary text-white hover:bg-secondary hover:text-primary border-primary border-2 transition-all ease-linear duration-150 "
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-5 py-14">
          <div className="flex flex-col gap-y-10">
            {sortedProducts?.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-12 lg:gap-x-10 pb-8 border-b"
              >
                <div className="col-span-12 md:col-span-4">
                  <div className="w-full">
                    <Link to={`/shop/${product?.slug}`}>
                      <img src={product?.photos[0]} className="rounded-lg" />
                    </Link>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <Link
                    to={`/shop/${product?.slug}`}
                    className="font-medium line-clamp-3  hover:underline hover:text-blue-700  text-[0.75rem] md:text-[1rem] mt-7 mb-2 capitalize"
                  >
                    {product?.title}
                  </Link>

                  <p className="text-gray-600 text-[14px] line-clamp-3 leading-7 mt-3">
                    {product?.details.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>
                  {product?.price && (
                    <p className="flex items-center text-[0.75rem] md:text-[1rem] font-bold text-[#00AEEF]  mt-5">
                      <FaBangladeshiTakaSign className="inline-block mr-1" />
                      {product?.price}
                    </p>
                  )}

                  <div className="flex items-center gap-x-2.5 mt-7">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="px-5 rounded-md py-1.5 text-[14px] font-medium bg-primary text-white hover:bg-secondary hover:text-primary border-primary border-2 transition-all ease-linear duration-150"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {products.length == 0 && (
        <h3 className="text-[32px] text-gray-400 text-center font-medium pb-28">
          Product Not Found
        </h3>
      )}
      {/* {totalPages != 0 && (
        <div className="flex justify-center mt-16 pt-12 pb-20">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 text-white bg-primary rounded-lg disabled:bg-gray-400"
          >
            <FaChevronLeft />
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-1 text-white bg-primary rounded-lg disabled:bg-gray-400"
          >
            <FaChevronRight />
          </button>
        </div>
      )} */}
      {totalProducts > productsPerPage && (
        <div className="flex justify-center mt-16 pt-12 pb-20">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 text-white bg-primary rounded-lg disabled:bg-gray-400"
          >
            <FaChevronLeft />
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-1 text-white bg-primary rounded-lg disabled:bg-gray-400"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      <ShopDrawer
        toggleDrawer={toggleDrawer}
        lastSlug={lastSlug}
        isShopDrawerOpen={isShopDrawerOpen}
      ></ShopDrawer>
    </>
  );
};

export default CategoryShop;
