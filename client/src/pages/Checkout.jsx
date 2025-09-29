import { useEffect, useState } from "react";
import BillingDetails from "../components/checkout/BillingDetails";
import OrderDetails from "../components/checkout/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import api from "../components/axios/Axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetAgroCart } from "../redux/slices/cart/agroCartSlice";

const CheckOut = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    upazilla: "",
    area: "",
    postCode: "",
    streetAddress: "",
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  const handleChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!billingDetails.name) newErrors.name = "Name is required";
    if (!billingDetails.email) newErrors.email = "Email is required";
    if (!billingDetails.phone) newErrors.phone = "Phone is required";
    if (!billingDetails.district) newErrors.district = "District is required";
    if (!billingDetails.upazilla) newErrors.upazilla = "Upazilla is required";
    if (!billingDetails.area) newErrors.area = "Area is required";
    if (!billingDetails.postCode) newErrors.postCode = "Post Code is required";
    if (!billingDetails.streetAddress)
      newErrors.streetAddress = "Street Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handlePlaceOrder = async () => {
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const orderData = {
      name: billingDetails?.name,
      email: billingDetails?.email,
      phone: billingDetails?.phone,
      district: billingDetails?.district,
      upazilla: billingDetails?.upazilla,
      area: billingDetails?.area,
      postCode: billingDetails?.postCode,
      streetAddress: billingDetails?.streetAddress,
      notes: billingDetails?.notes || "",
      product: id
    };

    try {
      const response = await api.post("orders", orderData);
      if (response.status === 201) {
        dispatch(resetAgroCart());
        navigate("/thank-you");
      } else {
        console.error("Error placing order:", response);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-robo">
      <div className="h-[89.4px] mb-10"></div>
      <div className="w-full md:w-2/3 border rounded-xl gap-4 text-gray-600 mt-20 mx-auto">
        <form className="w-full mx-auto p-4">
          <h2 className="text-xl text-center font-medium mb-2 text-gray-600">
            Order Details
          </h2>
          <div className="border mb-4"></div>

          <div className="w-full mb-4 relative">
            <label className="block text-gray-700 mb-2 text-sm">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={billingDetails.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
              placeholder="First name"
              // disabled
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="mb-4 w-full relative">
            <label className="block text-gray-700 mb-2 text-sm">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={billingDetails.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
              placeholder="Email address"
              // disabled
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4 w-full relative">
            <label className="block text-gray-700 mb-2 text-sm">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={billingDetails.phone}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
              placeholder="Phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm">
              District *
            </label>
            <input
              type="text"
              name="district"
              value={billingDetails.district}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
              placeholder="District"
            />
            {errors.district && (
              <p className="text-red-500 text-sm">{errors.district}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm">
              Upazilla *
            </label>
            <input
              type="text"
              name="upazilla"
              value={billingDetails.upazilla}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
              placeholder="Upazilla"
            />
            {errors.upazilla && (
              <p className="text-red-500 text-sm">{errors.upazilla}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm">Area *</label>
            <input
              type="text"
              name="area"
              value={billingDetails.area}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
              placeholder="Area"
            />
            {errors.area && (
              <p className="text-red-500 text-sm">{errors.area}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm">
              Post Code *
            </label>
            <input
              type="text"
              name="postCode"
              value={billingDetails.postCode}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
              placeholder="Post Code"
            />
            {errors.postCode && (
              <p className="text-red-500 text-sm">{errors.postCode}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm">
              Street Address *
            </label>
            <input
              type="text"
              name="streetAddress"
              value={billingDetails.streetAddress}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
              placeholder="House number and street name"
            />
            {errors.streetAddress && (
              <p className="text-red-500 text-sm">{errors.streetAddress}</p>
            )}
          </div>
          <div className="border border-b-0 mb-4 "></div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-2 text-sm">
              Order notes (optional)
            </label>
            <textarea
              type="text"
              value={billingDetails.notes}
              onChange={handleChange}
              className="w-full h-32 p-3 rounded bg-slate-100 outline-none text-sm"
              placeholder="Company name"
            />
          </div>
        </form>
      </div>
      <div className="pl-20 mb-20 flex justify-between">
        <button
          className={`mt-4 px-12 py-2 bg-primary hover:bg-white text-white border hover:text-gray-500 hover:border hover:border-gray-500 rounded-lg font-bold mx-auto ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
