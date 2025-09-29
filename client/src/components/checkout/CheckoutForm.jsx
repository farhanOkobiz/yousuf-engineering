import React, { useEffect, useState, useContext } from "react";
import { FaMinus } from "react-icons/fa6";
import Containar from "../../layouts/Containar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TiArrowBackOutline } from "react-icons/ti";
import { deleteFromCart, resetCart } from "../../redux/slices/cartSlices";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import axios from "axios";
import { MdOutlineDeleteForever } from "react-icons/md";
import { city } from "../constants";
import ApiContext from "../baseapi/BaseApi";
import freeshippingImg from "../../assets/icons/freeshipping-BO3hBmAA.png";
import { FaUser } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdSpeakerNotes } from "react-icons/md";

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCity, setLoadingCity] = useState(true);
  const [loadingZone, setLoadingZone] = useState(true);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [zonelist, setZoneList] = useState([]);
  const [arealist, setAreaList] = useState([]);
  const [cityKey, setCityKey] = useState(0);
  const [ZoneKey, setZoneKey] = useState(0);
  const baseApi = useContext(ApiContext);
  const [isShaking, setIsShaking] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    district: {},
    streetAddress: "",
    notes: "",
    area: {},
    zone: {},
    shipping: "",
    payment: "cod",
    couponCode: "",
  });

  useEffect(() => {
    setLoadingCity(true);
    if (cityKey !== 0) {
      getCZone(cityKey);
    }
  }, [cityKey]);

  useEffect(() => {
    setLoadingZone(true);
    getCArea(ZoneKey);
  }, [ZoneKey]);

  const getCZone = async (id) => {
    try {
      const response = await axios.post(
        `${baseApi}/pathaoLocation/city/${id}/zones`
      );

      setZoneList(response.data.data.data);
      if (response?.data?.data.data.length > 0) {
        setLoadingCity(false);
      }
    } catch (error) {
      console.error("Error fetching zones:", error);
      return null;
    }
  };

  const getCArea = async (id) => {
    if (id === 0) {
      return;
    }
    try {
      const res = await axios.post(
        `${baseApi}/pathaoLocation/zone/${id}/area-list`
      );
      setAreaList(res?.data?.data.data);
      if (res?.data?.data.data.length > 0) {
        setLoadingZone(false);
      }
      // console.log(arealist, "arealist");
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("formData", formData);

  const handleCouponCode = async () => {
    if (formData.couponCode.trim() === "") {
      setCouponError("কুপন কোড দেন");
      setCouponDiscount(0);
      formData.couponCode = "";
      return;
    }

    try {
      const response = await axios.get(
        `${baseApi}/coupon/${formData.couponCode}`
      );

      if (response.data.status == "success") {
        setCouponDiscount(response.data.data.coupon.discountPercent);
        setCouponError("");
      } else {
        setCouponError("কুপন কোডটি ভুল!");
        setCouponDiscount(0);
      }
    } catch (error) {
      console.error("Error fetching coupon", error);
      setCouponError("ভুল কুপন কোড দিয়েছেন! সঠিক কোড দেন।");
      setCouponDiscount(0);
    }
  };

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state?.cart?.items);

  const hasFreeShipping = cartItems?.some(
    (item) => item?.selectedOption?.freeShipping === true
  );

  // console.log(cartItems, "CartItems,,,,,,,,,,,,");

  const calculateSubtotal = () => {
    return cartItems?.reduce(
      (total, item) =>
        total +
        (couponDiscount > 0
          ? item?.selectedOption?.price
          : item?.selectedOption?.discountValue > 0
          ? Math.ceil(item?.selectedOption?.salePrice)
          : item?.selectedOption?.price) *
          item.quantity,
      0
    );
  };

  const getShippingCost = () => {
    if (hasFreeShipping) return 0;
    switch (formData?.shipping) {
      case "insideDhaka":
        return 70;
      case "outsideDhaka":
        return 140;
      default:
        return 0;
    }
  };

  const calculateTotalCost = () => {
    const subtotal = calculateSubtotal();
    const discount = (couponDiscount / 100) * subtotal;
    const shippingCost = getShippingCost();
    const total = subtotal - discount + shippingCost;
    return Math.ceil(total);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // if (name === "area" || name === "district" || name === "zone") {
    //   updatedValue = JSON.parse(value);
    // }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });

    // if (name === "district") {
    //   const selectedCity = JSON.parse(value);

    //   if (selectedCity?.city_name === "Dhaka") {
    //     setFormData((prevState) => ({
    //       ...prevState,
    //       shipping: "insideDhaka",
    //     }));
    //   } else {
    //     setFormData((prevState) => ({
    //       ...prevState,
    //       shipping: "outsideDhaka",
    //     }));
    //   }
    // }

    // if (name === "district") {
    //   setCityKey(updatedValue?.city_id || 0);
    // }
    // if (name === "zone") {
    //   setZoneKey(updatedValue?.zone_id || 0);
    // }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // console.log(cartItems, "...............");

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{11,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be at least 11 digits";
    }
    if (!formData.streetAddress)
      newErrors.streetAddress = "Street Address is required";
    // if (!formData.area || !formData.area.area_id)
    //   newErrors.area = "Area is required";
    // if (!formData.district || !formData.district.city_id)
    //   newErrors.district = "City is required";
    // if (!formData.zone || !formData.zone.zone_id)
    //   newErrors.zone = "Zone is required";
    if (!formData.shipping && !hasFreeShipping)
      newErrors.shipping = "Shipping method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        // console.log("handel submit");
        const orderData = {
          name: formData.fullName,
          phone: formData.phoneNumber,
          email: formData.email,

          // city: {
          //   cityID: formData.district?.city_id,
          //   cityName: formData.district?.city_name,
          // },
          // zone: {
          //   zoneID: formData.zone?.zone_id,
          //   zoneName: formData.zone?.zone_name,
          // },
          // area: {
          //   areaID: formData.area?.area_id,
          //   areaName: formData.area?.area_name,
          // },
          streetAddress: formData.streetAddress,
          notes: formData.notes,
          shippingCost: getShippingCost(),
          products: cartItems?.map((item) => ({
            option: item.colorOptionId,
            quantity: item.quantity,
            userSelectedColor: item.userChoiceColor || "",
          })),
          ...(formData.couponCode.trim() && { coupon: formData.couponCode }),
        };

        // console.log("orderData", orderData);

        const apiEndpoint = formData.couponCode.trim()
          ? `${baseApi}/order/withCoupon`
          : `${baseApi}/order`;

        const response = await axios.post(apiEndpoint, orderData);

        dispatch(resetCart());
        navigate("/thankyou");
      } catch (error) {
        setIsLoading(false);
        console.error("Error submitting order", error);
        setCouponError(
          error.response?.data?.message ||
            "An error occurred while placing the order"
        );
      }
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "",
      shipping: "",
      payment: "cod",
      couponCode: "",
      notes: "",
      // district: {},
      streetAddress: "",
      // area: {},
      // zone: {},
    });
    setErrors({});
  };

  useEffect(() => {
    // Set an interval to trigger the shake animation every 3 seconds
    const interval = setInterval(() => {
      setIsShaking(true); // Start shaking
      setTimeout(() => setIsShaking(false), 500); // Stop shaking after animation duration (0.5s)
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pb-20 font-inter bg-gray-50">
      {cartItems?.length > 0 ? (
        <Containar>
          <div>
            <div className="grid grid-cols-12 md:gap-x-8">
              <div className="col-span-12 order-2 lg:order-1 lg:col-span-8  ">
                <div className="bg-white pt-4 pb-8 px-6 shadow-md rounded">
                  <h2 className="text-texthead text-lg font-medium uppercase">
                    পরিচিতি তথ্য
                  </h2>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="w-full flex items-start flex-wrap justify-between">
                        <div className="w-full flex items-center">
                          <FaUser className="w-[60px] h-10 bg-gray-200 p-2 rounded-l" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full h-10 px-3 border  rounded-r ${
                              errors.fullName
                                ? "border-red-500"
                                : "border-border"
                            }`}
                            placeholder="আপনার নাম *"
                          />
                        </div>
                      </div>
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-0.5">
                          {errors.fullName}
                        </p>
                      )}
                      <div className="w-full flex items-start flex-wrap justify-between mt-5">
                        <div className="w-full lg:w-[48%] flex items-center">
                          <IoIosCall className="w-16 h-10 bg-gray-200 p-2 rounded-l" />
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className={`w-full h-10 px-3 border  rounded-r ${
                              errors.phoneNumber
                                ? "border-red-500"
                                : "border-border"
                            }`}
                            placeholder="মোবাইল নাম্বার *"
                          />
                        </div>

                        <div className="w-full lg:w-[48%]  mt-5 lg:mt-0 flex items-center">
                          <MdEmail className="w-16 h-10 bg-gray-200 p-2 rounded-l" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full h-10 px-3 border border-border rounded-r"
                            placeholder="ইমেইল (যদি থাকে)"
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p className="text-red-500 text-sm mt-0.5">
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>

                      <h2 className="text-texthead text-lg font-medium my-5 uppercase">
                        শিপিং ঠিকানা
                      </h2>

                      {/* <div className="w-full flex items-start flex-wrap justify-between">
                        <div className="w-full lg:w-[49%] lg:mt-0 mt-5">
                          <select
                            onChange={handleChange}
                            className={`w-full py-3  px-3 h-12 leading-tight text-texthead transition border rounded-md appearance-none lg:pl-3 focus:shadow focus:placeholder-gray-600 focus:outline-none focus:ring-gray-600 focus:shadow-outline ${
                              errors.district
                                ? "border-red-500"
                                : "border-border"
                            }
                            }`}
                            name="district"
                          >
                            {city?.map((cityInfo) => (
                              <option
                                key={cityInfo?.city_id}
                                value={JSON.stringify(cityInfo)}
                              >
                                {cityInfo?.city_name}{" "}
                              </option>
                            ))}
                          </select>
                          {errors.district && (
                            <p className="text-red-500 text-sm mt-0.5">
                              {errors.district}
                            </p>
                          )}
                        </div>
                        <div className="w-full lg:w-[49%] mt-5 lg:mt-0">
                          <select
                            onChange={handleChange}
                            className={`w-full py-3  px-3  h-12 leading-tight text-texthead transition border rounded-md appearance-none lg:pl-3 focus:shadow focus:placeholder-gray-600 focus:outline-none focus:ring-gray-600 focus:shadow-outline ${
                              errors.district
                                ? "border-red-500"
                                : "border-border"
                            }
                            }`}
                            name="zone"
                          >
                            {loadingCity ? (
                              <>
                                <option value="">Zone ↓</option>
                                <option value="">Loading...</option>
                              </>
                            ) : (
                              <>
                                <option value="">Zone ↓</option>

                                {zonelist?.map((zoneInfo) => (
                                  <option
                                    key={zoneInfo?.zone_id}
                                    value={JSON.stringify(zoneInfo)}
                                  >
                                    {zoneInfo?.zone_name}{" "}
                                  </option>
                                ))}
                              </>
                            )}
                          </select>

                          {errors.zone && (
                            <p className="text-red-500 text-sm mt-0.5">
                              {errors.zone}
                            </p>
                          )}
                        </div>
                      </div> */}

                      {/* <div className="w-full flex items-start flex-wrap justify-between ">
                        <div className="w-full lg:w-[49%] mt-5 lg:mt-0">
                          <select
                            onChange={handleChange}
                            className={`w-full py-3  px-3 mt-2 h-12 leading-tight text-texthead transition border rounded-md appearance-none lg:pl-3 focus:shadow focus:placeholder-gray-600 focus:outline-none focus:ring-gray-600 focus:shadow-outline ${
                              errors.district
                                ? "border-red-500"
                                : "border-border"
                            }
                            }`}
                            name="area"
                          >
                            {loadingZone ? (
                              <>
                                <option value="">Area ↓</option>
                                <option value="">Loading...</option>
                              </>
                            ) : (
                              <>
                                <option value="">Area ↓</option>
                                {arealist?.map((areaInfo) => (
                                  <option
                                    key={areaInfo?.area_id}
                                    value={JSON.stringify(areaInfo)}
                                  >
                                    {areaInfo?.area_name}{" "}
                                  </option>
                                ))}
                              </>
                            )}
                          </select>
                          {errors.area && (
                            <p className="text-red-500 text-sm mt-0.5">
                              {errors.area}
                            </p>
                          )}
                        </div>
                        <div className="w-full lg:w-[49%] mt-5 lg:mt-0">
                          <input
                            type="text"
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleChange}
                            className={`w-full h-12 px-3 border mt-2 ${
                              errors.streetAddress
                                ? "border-red-500"
                                : "border-border"
                            }`}
                            placeholder="ঠিকানা *"
                          />
                          {errors.streetAddress && (
                            <p className="text-red-500 text-sm mt-0.5">
                              {errors.streetAddress}
                            </p>
                          )}
                        </div>
                      </div> */}
                      <div className="w-full  lg:mt-0 flex items-center">
                        <FaMapMarkerAlt className="w-16 h-10 bg-gray-200 p-2 rounded-l" />
                        <input
                          type="text"
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleChange}
                          className={`w-full h-10 px-3 border  rounded-r ${
                            errors.streetAddress
                              ? "border-red-500"
                              : "border-border"
                          }`}
                          placeholder="ঠিকানা * (বাসার ঠিকানা+এরিয়া+থানা+জেলা) লিখুন"
                        />
                      </div>
                      {errors.streetAddress && (
                        <p className="text-red-500 text-sm mt-0.5">
                          {errors.streetAddress}
                        </p>
                      )}
                      <div className="w-full  mt-5 flex items-center">
                        <MdSpeakerNotes className="w-16 h-10 bg-gray-200 p-2 rounded-l" />
                        <input
                          type="text"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          className="w-full h-10 px-3 border border-border rounded-r"
                          placeholder="আপনার মন্তব্য থাকলে লিখুন..."
                        />
                      </div>

                      <div className="w-full flex items-center flex-wrap justify-between mt-3">
                        {/* {console.log("hasFreeShipping:", hasFreeShipping)} */}
                        {hasFreeShipping ? (
                          <div className="flex gap-2 items-center">
                            <img
                              src={freeshippingImg}
                              alt=""
                              className="w-32"
                            />{" "}
                            <span className="blinking-text">
                              product. Yeah!!!
                            </span>
                          </div>
                        ) : (
                          <div className="w-full lg:w-[49%] mt-5">
                            <h4 className="text-[15px] font-medium mb-2 uppercase">
                              ডেলিভারি চার্জ সিলেক্ট করুন *
                            </h4>
                            <div>
                              <label className="flex items-center text-sm font-medium gap-5 cursor-pointer border px-5 py-2">
                                <input
                                  name="shipping"
                                  id="shippingInsideDhaka"
                                  type="radio"
                                  value="insideDhaka"
                                  checked={formData.shipping === "insideDhaka"}
                                  onChange={handleChange}
                                  required={!hasFreeShipping}
                                  disabled={hasFreeShipping}
                                  className="scale-150 cursor-pointer"
                                />
                                <div className="flex items-center gap-2">
                                  <h3>ঢাকার মধ্যে</h3>
                                  <h4 className="flex items-center gap-x-0.5">
                                    ৳ 70tk
                                  </h4>
                                </div>
                              </label>
                              <label className="mt-2  gap-5 flex items-center text-sm font-medium  cursor-pointer border px-5 py-2">
                                <input
                                  name="shipping"
                                  id="shippingOutsideDhaka"
                                  type="radio"
                                  value="outsideDhaka"
                                  checked={formData.shipping === "outsideDhaka"}
                                  onChange={handleChange}
                                  required={!hasFreeShipping}
                                  disabled={hasFreeShipping}
                                  className="scale-150 cursor-pointer"
                                />
                                <div className="flex items-center gap-2">
                                  <h3>ঢাকার বাইরে</h3>
                                  <h4 className="flex items-center gap-x-0.5">
                                    ৳ 140tk
                                  </h4>
                                </div>
                              </label>
                            </div>
                            {errors.shipping && (
                              <p className="text-red-500 text-sm mt-2">
                                {errors.shipping}
                              </p>
                            )}
                          </div>
                        )}
                        <div className="w-full lg:w-[49%] mt-5">
                          <h4 className="text-[15px] font-medium mb-2  uppercase">
                            অফার পেতে কুপন কোড দেন (যদি থাকে)
                          </h4>
                          <div className="flex items-center">
                            <input
                              type="text"
                              name="couponCode"
                              value={formData.couponCode}
                              onChange={handleChange}
                              className={`w-full h-10 px-3 border  ${
                                errors.couponCode
                                  ? "border-red-500"
                                  : "border-border"
                              }`}
                              placeholder="আপনার কুপন কোড দেন"
                            />
                            <button
                              type="button"
                              onClick={handleCouponCode}
                              className=" bg-red-500 hover:opacity-60 transition-all ease-linear duration-200 text-white w-48 lg:px-5 py-2.5 rounded-r text-sm"
                            >
                              Apply Coupon
                            </button>
                          </div>
                          {couponError && (
                            <p className="text-red-500 text-sm mt-2">
                              {couponError}
                            </p>
                          )}

                          {couponDiscount > 0 && !couponError && (
                            <p className="text-green-600 text-sm mt-2">
                              কুপন এপ্লাই হয়েছে! ডিস্কাউন্ট: {couponDiscount}%
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-6 flex gap-4">
                        <button
                          type="button"
                          onClick={handleReset}
                          disabled={isLoading}
                          className="px-10 rounded bg-secendary text-white hover:bg-red-700 transition-colors duration-200"
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          style={{
                            animation: isShaking
                              ? "shake 0.3s ease-in-out"
                              : "none",
                          }}
                          disabled={isLoading}
                          className="w-full rounded py-3 flex items-center text-white justify-center font-medium hover:bg-secendary transition-all ease-linear duration-200 bg-primary cursor-pointer"
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
                                ></path>
                              </svg>
                              অর্ডার হচ্ছে, অপেক্ষা করুন...
                            </span>
                          ) : (
                            "অর্ডার করুন এখনই"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-span-12 order-1 lg:order-2 mt-5 lg:mt-0 lg:col-span-4">
                <div className="pt-3 bg-white shadow-md border border-texthead rounded">
                  <div className=" border-b border-b-border">
                    <h2 className="px-6  text-texthead text-lg font-medium uppercase">
                      আপনার অর্ডার ওভারভিউ
                    </h2>
                    <ul className="">
                      {cartItems?.map((item) => (
                        <li
                          key={item?._id}
                          className="px-6 flex items-center justify-between text-sm py-1 border-b border-gray-200"
                        >
                          {/* Box for the item */}
                          <div className="flex items-center gap-x-4 w-full">
                            {/* Image Section */}
                            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={item?.photos[0] || "/default-image.jpg"} // Default image if none exists
                                alt={item?.name}
                                className="object-cover w-full h-full"
                              />
                            </div>

                            {/* Item Details */}
                            <div className="w-[70%]">
                              <Link
                                to={`/productdetail/${item?.name}/${item?._id}`}
                                className="text-texthead cursor-pointer hover:text-red-500 transition-all ease-linear duration-200"
                              >
                                {item?.name?.slice(0, 50)}
                              </Link>

                              <span className="text-red-500">
                                {" "}
                                × {item?.quantity}
                              </span>

                              {item?.userChoiceColor &&
                                item?.userChoiceColor.length > 0 && (
                                  <h4 className="text-xs mt-1">
                                    Color:{" "}
                                    <span className="capitalize">
                                      {item?.userChoiceColor}
                                    </span>
                                  </h4>
                                )}
                            </div>

                            {/* Price and Delete Button */}
                            <div className="flex items-center gap-x-2">
                              {couponDiscount > 0 ? (
                                <span className="text-sm font-medium text-red-500">
                                  ৳ {item?.selectedOption?.price}
                                </span>
                              ) : (
                                <>
                                  <span className="text-sm font-medium text-texthead">
                                    ৳{" "}
                                    {(item?.selectedOption?.discountValue > 0
                                      ? Math?.ceil(
                                          item?.selectedOption?.salePrice
                                        )
                                      : item?.selectedOption?.price) *
                                      item?.quantity}
                                  </span>
                                  {item?.selectedOption?.discountValue > 0 && (
                                    <del className="line-through text-normal text-red-500">
                                      ৳{" "}
                                      {item?.selectedOption?.discountValue >
                                        0 &&
                                        item?.selectedOption?.price *
                                          item?.quantity}
                                    </del>
                                  )}
                                </>
                              )}

                              <span
                                onClick={() =>
                                  dispatch(
                                    deleteFromCart({
                                      id: item._id,
                                      colorOptionId: item?.selectedOption?._id,
                                      selectedSize: item?.selectedSize,
                                    })
                                  )
                                }
                                className="text-red-500 cursor-pointer text-lg"
                              >
                                <MdOutlineDeleteForever />
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="py-5 border-b border-b-border">
                      <ul className=" px-6 flex items-center justify-between text-base">
                        <li>Coupon Discount</li>
                        <li className="flex items-center gap-x-0.5">
                          <FaMinus className="mr-1" /> {couponDiscount} %
                        </li>
                      </ul>
                    </div>
                  )}

                  <div className="py-3 border-b border-b-border">
                    <ul className=" px-6 flex items-center justify-between text-base">
                      <li className="uppercase">Subtotal</li>
                      <li className="flex items-center gap-x-0.5">
                        <span className="mr-1">৳</span>
                        {couponDiscount > 0
                          ? Math.ceil(
                              calculateSubtotal() -
                                calculateSubtotal() * (couponDiscount / 100)
                            )
                          : calculateSubtotal()}
                      </li>
                    </ul>
                  </div>

                  <div className="py-3 border-b border-b-border">
                    <h2 className="px-6 uppercase text-texthead text-lg font-medium">
                      ডেলিভারি চার্জ
                    </h2>
                    <div className="mt-3 px-6 text-sm flex justify-between items-center">
                      <div className="flex items-start text-base font-normal gap-x-1">
                        <input
                          className="mt-1"
                          name="payment"
                          id="paymentCOD"
                          type="radio"
                          value="cod"
                          checked={formData.payment === "cod"}
                          onChange={handleChange}
                          required
                        />
                        <div>
                          <h3>ক্যাস অন ডেলিভারি</h3>
                        </div>
                      </div>
                      <div className="flex items-start text-base font-normal gap-x-1">
                        <h3 className="flex items-center gap-x-1 text-sm">
                          <span className="mr-1">৳</span> {getShippingCost()}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="py-3 border-b border-b-border flex justify-between">
                    <h2 className="px-6 uppercase text-texthead text-lg font-medium">
                      Total Cost
                    </h2>
                    <h2 className="px-6 capitalize text-red-500 text-lg font-bold flex items-center gap-x-1">
                      <span className="mr-1">৳</span> {calculateTotalCost()}
                    </h2>
                  </div>

                  <div className="py-3 border-b border-b-border">
                    <p className="px-6 text-sm font-normal">
                      আপনার ব্যক্তিগত ডেটা আপনার অর্ডার প্রক্রিয়া করতে, এই
                      ওয়েবসাইট জুড়ে আপনার অভিজ্ঞতা সমর্থন করতে এবং আমাদের
                      বর্ণিত অন্যান্য উদ্দেশ্যে ব্যবহার করা হবে
                      <Link
                        to={"/privacy"}
                        className="text-red-500 underline ml-2"
                      >
                        প্রাইভেসি পলিসি
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="mt-1">
                  <button
                    onClick={() => navigate("/cart")}
                    className="py-5 w-full flex rounded items-center justify-center border-black border text-black hover:text-white duration-200 font-medium hover:bg-black"
                  >
                    <span className="flex items-center gap-x-1">
                      <TiArrowBackOutline /> কার্টে দেখুন
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Containar>
      ) : (
        <div className="">
          <div className="flex justify-center items-center">
            <HiOutlineShoppingBag className="text-[240px]" />
          </div>
          <h2 className="text-center text-2xl font-medium mt-5">
            Your Cart is currently empty.
          </h2>
          <div className="flex justify-center items-center mt-6 pb-10">
            <Link
              className="text-lg bg-texthead hover:bg-black transition-all ease-linear duration-200 font-medium px-16 py-4 text-white"
              to={"/shop"}
            >
              Return to shop
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckoutForm;
