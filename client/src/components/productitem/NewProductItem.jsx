import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import axios from "axios";
import ApiContext from "../baseapi/BaseApi";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import SkeletonLoader from "../skeletonLoader/SkeletonLoader";
import { motion } from "framer-motion";

const NewProductItem = ({
  image = [],
  product,
  discount,
  subtitle,
  title,
  brandName,
  categoryName,
  offerprice,
  regularprice,
  classItem,
  categoryId,
  brandId,
  discountType,
  discountPercent,
  priceAfterDiscount,
  id,
  slug,
  freeShipping,
  achieveSizes,
  stock,
}) => {
  const dispatch = useDispatch();

  const baseApi = useContext(ApiContext);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalCart, setShowModalCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
        setShowModalCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleFetchOptionData = async (item) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${baseApi}/product/${item?.product?._id}/options`
      );

      const fetchedOptions = response?.data?.data?.options || [];
      const isEmpty = fetchedOptions[0]?.size === "";

      if (isEmpty) {
        // console.log("Fetched options (empty):", fetchedOptions);
        setOptions(fetchedOptions);
        await handleAddToCart(fetchedOptions); // Pass fetched options directly
        return;
      } else {
        // console.log("Fetched options:", fetchedOptions);
        setOptions(fetchedOptions);
        setShowModal(true);
      }
    } catch (err) {
      setError("Failed to fetch options. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchOptionDataCart = async (item) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${baseApi}/product/${item?.product?._id}/options`
      );
      const fetchedOptions = response?.data?.data?.options || [];
      const isEmpty =
        fetchedOptions[0]?.size === "" ||
        fetchedOptions[0]?.size === selectedSize;

      if (isEmpty) {
        setOptions(fetchedOptions);
        await handleAddToCart(fetchedOptions); // Pass fetched options directly
        return;
      } else {
        setOptions(fetchedOptions);
        setShowModal(true);
      }
    } catch (err) {
      setError("Failed to fetch options. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };


  const slg = (product?.product?.name || "")
    .toLowerCase()
    .trim()
    .replace(/[^\u0980-\u09FF0-9a-zA-Z\s-]/g, "") // Allow Bangla, numbers, and letters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single one
    .replace(/^-|-$/g, ""); // Remove leading or trailing hyphens
  return (
    <>
      <motion.div className="max-w-xs border relative border-gray-200 rounded-lg overflow-hidden shadow-lg mx-1">
        {stock > 0 ? (
          <Link to={`/productdetail/${slg}/${id}`}>
            <div className="overflow-hidden group relative">
              <img
                className="w-full object-cover mx-auto transition-transform duration-300 group-hover:scale-105"
                src={image[0]}
                alt="product"
              />
              {discount > 0 && discountType === "amount" ? (
                <div className="absolute right-0 top-3 px-3 py-2 shadow-lg text-xs bg-red-500 text-white flex items-center gap-x-0.5">
                  ৳ {discount}
                </div>
              ) : (
                discount > 0 &&
                discountType === "percent" && (
                  <div className="absolute right-0 top-3 px-3 py-2 shadow-lg text-xs bg-red-500 text-white flex items-center gap-x-0.5">
                    {discount} %
                  </div>
                )
              )}
              {freeShipping && (
                <div className="absolute left-0 top-4 py-1 px-2 bg-[#10B1DF] text-sm text-white gap-x-0.5">
                  Free Shipping
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className="overflow-hidden cursor-not-allowed">
            <div className="group">
              <img
                className="w-full object-cover mx-auto opacity-50"
                src={image[0]}
                alt="product"
              />
            </div>
          </div>
        )}

        <div className="lg:px-4 pb-4 text-center">
          {/* <h3>
            <Link
              to={`/shop/brand/${brandId}/${encodeURIComponent(
                (brandName || "").replace(/\s+/g, "")
              )}`}
              className="uppercase block text-xs text-customRed my-2 "
            >
              {subtitle}
            </Link>
          </h3> */}
          <h2 className="font-semibold h-8 ">
            <Link
              to={`/productdetail/${slg}/${id}`}
              className="Truncate text-sm leading-5 inline-block font-medium text-gray-900 mt-1 text-ellipsis overflow-hidden break-words"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {title}
            </Link>
          </h2>
          <div className="flex flex-col items-center mt-6">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-900">
                <span className="">৳</span>
                {priceAfterDiscount
                  ? Math.round(priceAfterDiscount)
                  : regularprice}
              </span>
              {priceAfterDiscount > 0 && (
                <span className="text-sm text-[#BD1E2D] line-through ml-2">
                  <span className="mr-1">৳</span>
                  {regularprice}
                </span>
              )}
            </div>
            {/* <span className="text-sm text-gray-500 mt-1">
              {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
            </span> */}
          </div>
        </div>

        <div
          className={`relative group duration-200 ${
            stock > 0
              ? "cursor-pointer hover:bg-customRed text-secendary hover:text-white"
              : "cursor-not-allowed text-gray-400"
          } flex justify-center`}
        >
          <button
            style={{
              animation: "zoom 1s ease-in-out infinite",
            }}
            disabled={stock <= 0}
            onClick={stock > 0 ? () => handleFetchOptionData(product) : null}
            className="rounded-full text-white bg-primary hover:bg-secondary hover:text-primary border-primary border-2 transition-all ease-linear w-full bg-secendary hover:text-secendary duration-200 text-xs font-semibold px-2 text-center py-2"
          >
            Order Now
          </button>
        </div>

        {/* Buy now model */}
        {showModal && (
          <div className="absolute inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center">
            <div
              ref={modalRef}
              className="bg-white absolute bottom-0 p-4 w-96 max-w-full rounded shadow-lg"
            >
              <h3 className="text-sm mb-4">Select Size</h3>
              {loading ? (
                <p></p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <ul className="flex gap-x-1 items-center text-sm">
                  {options?.map((option) => (
                    <li
                      key={option._id}
                      className={`py-1 px-2 border ${
                        selectedSize === option.size
                          ? "border-danger text-danger"
                          : ""
                      } cursor-pointer`}
                      onClick={() => handleSizeClick(option.size)}
                    >
                      <div className="flex flex-col items-center">
                        <span>{option.size}</span>
                        {/* <span className="text-xs text-gray-500">
                            {option?.stock > 0
                              ? `Stock: ${option?.stock}`
                              : "Out of Stock"}
                          </span> */}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex gap-x-1">
                <button
                  className="px-2 py-0.5 text-sm bg-texthead text-white rounded"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className={`px-2 text-sm py-0.5 bg-[#F59120] text-white rounded flex items-center ${
                    !selectedSize ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    if (selectedSize) {
                      handleAddToCart();
                      navigate("/checkout");
                    }
                  }}
                  disabled={!selectedSize}
                >
                  Confirm
                  <TiTick className="text-xl group-hover:scale-125 duration-200" />
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default NewProductItem;
