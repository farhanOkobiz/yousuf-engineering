import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import axios from "axios";
import ApiContext from "../baseapi/BaseApi";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import SkeletonLoader from "../skeletonLoader/SkeletonLoader";
import { motion } from "framer-motion";

const ProductItem = ({
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

  const totalStock = achieveSizes?.reduce(
    (total, size) => total + size?.stock,
    0
  );

  // console.log("Hello", achieveSizes);
  // console.log("Regular price", id, regularprice, priceAfterDiscount);
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

  // const handleFetchOptionData = async (item) => {
  //   // console.log(item);
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.get(
  //       `${baseApi}/product/${item?._id}/options`
  //     );

  //     // console.log("stock..........", response.data.data?.options[0]);
  //     // console.log(response.data.data?.options[0].size, "ok...........");

  //     const isEmpty = response.data.data?.options[0].size === "" ? true : false;
  //     // console.log(isEmpty, "ok...........");

  //     // console.log(response.data.data?.options[0].size, "ok...........");

  //     if (isEmpty) {
  //       setOptions(response.data.data?.options);
  //       handleAddToCart();
  //       return;
  //     } else {
  //       setOptions(response.data.data?.options);
  //       setShowModal(true);
  //     }
  //     // console.log(item, ".................");
  //   } catch (err) {
  //     setError("Failed to fetch options. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleFetchOptionData = async (item) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${baseApi}/product/${item?._id}/options`
      );

      const fetchedOptions = response?.data?.data?.options || [];
      const isEmpty = fetchedOptions[0]?.size === "";

      if (isEmpty) {
        // console.log("Fetched options (empty):", fetchedOptions);
        setOptions(fetchedOptions);
        await handleAddToCart(fetchedOptions); // Pass fetched options directly
        navigate("/checkout");

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

  //   const handleFetchOptionDataCart = async (item) => {
  //   console.log("call Add to card --")
  //   // console.log(item);
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.get(
  //       `${baseApi}/product/${item?._id}/options`
  //     );

  //     const isEmpty = response.data.data?.options[0].size === "" ? true : false;

  //     if (isEmpty) {
  //       setOptions(response.data.data?.options);
  //       handleAddToCart();
  //       return;
  //     } else {
  //           console.log(
  //             "call Add to card -- response.data.data?.options",
  //             response.data.data?.options
  //           );
  //       setOptions(response.data.data?.options);
  //       console.log(
  //         "call Add to card -- options",
  //         options
  //       );
  //       setShowModal(true);
  //     }

  //     // setOptions(response.data.data?.options);
  //     // setShowModalCart(true);
  //   } catch (err) {
  //     setError("Failed to fetch options. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleFetchOptionDataCart = async (item) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${baseApi}/product/${item?._id}/options`
      );
      const fetchedOptions = response?.data?.data?.options || [];
      const isEmpty =
        fetchedOptions[0]?.size === "" ||
        fetchedOptions[0]?.size === selectedSize;
      // const selectedOption = currentOptions.find(
      //   (option) => option.size === "" || option.size === selectedSize
      // );

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

      // setOptions(response.data.data?.options);
      // setShowModalCart(true);
    } catch (err) {
      setError("Failed to fetch options. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (currentOptions = options) => {
    // const selectedOption = currentOptions.find((option) => option.size === "");
    const selectedOption = currentOptions.find(
      (option) => option.size === "" || option.size === selectedSize
    );

    // console.log("product --------------------:", product);
    // console.log("Selected option:", selectedOption);

    const item = {
      ...product,
      id: product?._id,
      slug: product?.slug,
      quantity: 1,
      photos: product?.photos,
      name: product?.name,
      colorOptionId: selectedOption?._id,
      _id: product?._id,
      selectedOption: {
        _id: selectedOption?._id,
        sku: selectedOption?.sku,
        size: selectedOption?.size,
        price: selectedOption?.price,
        salePrice: selectedOption?.salePrice,
        stock: selectedOption?.stock,
        discountType: selectedOption?.discountType,
        discountValue: selectedOption?.discountValue,
        visitCount: selectedOption?.visitCount,
        saleNumber: selectedOption?.saleNumber,
        freeShipping: selectedOption?.freeShipping,
      },
      selectedColor: selectedOption?.variant,
    };

    // console.log("Product Item to Add:", item);
    dispatch(addToCart(item));
    setShowModal(false);
  };

  // console.log(
  //   "cart......",
  //   useSelector((state) => state)
  // );
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModalCart = () => {
    setShowModalCart(false);
  };

  const titlee = product?.name || "";
  // console.log("Product Title:", titlee);

  const slg = titlee
    .toLowerCase()
    .trim()
    .replace(/[^\u0980-\u09FF0-9a-zA-Z\s-]/g, "") // Allow Bangla, numbers, and letters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single one
    .replace(/^-|-$/g, ""); // Remove leading and trailing hyphens

  return (
    <>
      <motion.div className="max-w-xs border border-gray-300 rounded overflow-hidden shadow-lg mx-1 bg-white ">
        {totalStock > 0 ? (
          <Link to={`/productdetail/${slg}/${id}`}>
            <div className="overflow-hidden group relative ">
              <img
                className="w-full object-cover mx-auto transition-transform duration-300 hover:scale-105"
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
                  {/* <img src={freeshippingImg} alt="" className="w-20" /> */}
                  Free Shipping
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className="overflow-hidden cursor-not-allowed">
            <div className="group">
              <img
                className="w-full object-cover mx-auto opacity-50 duration-300 hover:scale-105"
                src={image[0]}
                alt="product"
              />
            </div>
          </div>
        )}
        <div className="lg:px-4 pb-4 text-center">
          <h2 className="font-semibold h-8">
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
          </div>
        </div>

        <div
          style={{
            animation: "zoom 1s ease-in-out infinite",
          }}
          className={`relative group duration-200 ${
            totalStock > 0
              ? "cursor-pointer hover:bg-customRed text-gray-500  hover:text-white"
              : "cursor-not-allowed text-gray-400"
          } flex justify-center`}
        >
          {totalStock > 0 && (
            <button
              disabled={totalStock <= 0}
              onClick={
                totalStock > 0 ? () => handleFetchOptionData(product) : null
              }
              className="bg-secendary text-white hover:bg-primary hover:text-secendary duration-200  text-xs font-semibold px-2 w-full text-center py-2"
            >
              Explore Our Latest Products.
            </button>
          )}
        </div>

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
                <ul className="flex gap-x-1 items-center">
                  {options?.map((option) => (
                    <li
                      key={option._id}
                      className={`py-1 px-2 border ${
                        selectedSize === option.size
                          ? "border-[#10B1DF] text-[#10B1DF]"
                          : ""
                      } cursor-pointer`}
                      onClick={() => handleSizeClick(option.size)}
                    >
                      <div className="flex flex-col items-center text-sm">
                        <span>{option.size}</span>
                        <span className="text-xs text-gray-500">
                          {option?.stock > 0 ? "" : "Out of Stock"}
                        </span>
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
                  <TiTick className="text-xl  duration-200" />
                </button>
              </div>
            </div>
          </div>
        )}
        {showModalCart && (
          <div className="absolute inset-0 z-30 bg-red bg-opacity-30 flex justify-center items-center">
            <div
              ref={modalRef}
              className="bg-white absolute bottom-0 p-4 w-full max-w-full rounded shadow-lg "
            >
              <h3 className="text-sm font-semibold mb-4">Select Size</h3>
              {loading ? (
                <p></p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <ul className="flex gap-x-1 items-center">
                  {options?.map((option) => (
                    <li
                      key={option._id}
                      className={`py-1 px-2 border ${
                        selectedSize === option.size
                          ? "border-#10B1DF text-#10B1DF"
                          : ""
                      } cursor-pointer ${
                        option?.stock <= 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        option?.stock > 0 && handleSizeClick(option.size)
                      }
                    >
                      <div className="flex flex-col items-center text-sm">
                        <span>{option.size}</span>
                        <span className="text-xs text-gray-500">
                          {option?.stock > 0 ? "" : "Out of Stock"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex gap-x-2">
                <button
                  className="px-2 py-0.5 text-sm bg-texthead text-white rounded"
                  onClick={handleCloseModalCart}
                >
                  Cancel
                </button>
                <button
                  className={`px-2 text-sm py-0.5 bg-[#F59120] text-white rounded flex items-center ${
                    !selectedSize ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    setShowModalCart(false);
                    handleAddToCart();
                  }}
                  disabled={!selectedSize}
                >
                  Confirm
                  <TiTick className="text-xl  duration-200" />
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default ProductItem;
