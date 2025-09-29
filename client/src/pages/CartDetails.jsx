import { useState } from "react";

import Containar from "../components/containar/Containar";
import BradCumbs from "../components/shared/BradCumbs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaArrowLeftLong, FaMinus, FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {
  deleteFromAgroCart,
  resetAgroCart,
  updateQuantity,
} from "../redux/slices/cart/agroCartSlice";

const CartDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  // Access cart items from Redux store
  const cartItems = useSelector((state) => state.agroCart);

  const handleResetCart = () => {
    dispatch(resetAgroCart());
  };

  // const handleQuantityChange = (id, newQuantity) => {
  //   if (newQuantity > 0) {
  //     dispatch(updateQuantity({ _id: id, quantity: newQuantity }));
  //   }
  // };

  const handleQuantityChange = (id, change) => {
    // Find the current item
    const currentItem = cartItems.find((item) => item._id === id);
    if (!currentItem) return;

    // Determine if the unit is in tons or kilograms
    // const isTon = currentItem.quantity > 1000;
    // console.log(isTon, "This is iston")

    // Step size: 1 for tons, 0.001 for kilograms
    const step = 1;

    console.log(
      `Item ID: ${id}, Quantity: ${currentItem.quantity}, Step: ${step}`
    );

    const newQuantity = currentItem.quantity + change * step;

    // Ensure quantity is not negative
    if (newQuantity >= 0) {
      dispatch(updateQuantity({ _id: id, quantity: newQuantity }));
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteFromAgroCart(id));
  };

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleCouponApply = () => {
    // Implement coupon validation and discount calculation here
    if (couponCode === "YOUR_COUPON_CODE") {
      setCouponDiscount(10); // Apply a 10% discount
    } else {
      setCouponDiscount(0);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateDeliveryCharges = () => {
    return 80; // Example: Fixed delivery charge of 80
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const total = subtotal - couponDiscount;
    return total;
  };

  const handleCheckout = () => {
    // if (token) {
    //   navigate("/checkout");
    // } else {
    //   navigate("/login");
    // }
    navigate("/checkout");
  };
  

  return (
    <div className="font-robo pb-20">
      <div className="h-[64px] sm:h-[83.4px] bg-[#f5f5f5] "></div>
      <BradCumbs title="Qutex " brad="Cart"></BradCumbs>
      <Containar>
        <div className="mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold my-10">Cart Details</h1>

          {cartItems.length === 0 ? (
            <div className="flex justify-center">
              <div className="text-center  font-semibold my-20">
                <HiOutlineShoppingBag className="text-[220px] mx-auto" />
                <h3 className="text-[28px] mt-10"> Your cart is empty.</h3>
                <Link to="/shop">
                  <button className="mt-10 inline-block w-full md:w-auto text-center rounded-md text-white text-[14px] bg-[#178843] px-4 py-1">
                    Shop Again
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-between relative flex-wrap">
              <div className="w-full  mx-auto">
                <div className="border rounded-xl">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-4xl text-gray-500">
                      <thead className="min-w-full rounded-2xl">
                        <tr className="rounded-4xl">
                          <th className="px-4 py-3 text-left w-1/2 rounded-4xl">
                            Product
                          </th>
                          <th className="px-4 py-2 text-left w-1/12">Price</th>
                          <th className="px-4 py-2 text-left w-1/6">
                            Quantity
                          </th>
                          <th className="px-4 py-2 text-left w-1/6">Total</th>
                          <th className="px-4 py-2 text-left w-1/12"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr
                            key={item._id}
                            className="bg-white border border-gray-30 hover:bg-gray-100"
                          >
                            <td className="lg:px-4 py-2 flex items-center">
                              <img
                                src={item.photos[0]}
                                className="w-20 h-20 border rounded-lg hidden sm:block"
                                alt={item.name}
                              />
                              <Link
                                to={`/shop/${item?.slug}`}
                                className="pl-3 text-[12px] lg:text-[15px]  capitalize font-semibold"
                              >
                                {item.title}
                              </Link>
                            </td>
                            <td className="px-4 py-2">{item.price}</td>
                            <td className="px-4 py-2 ">
                              <div className="flex justify-center items-center space-x-3">
                                <div className="flex justify-around items-center border p-2 rounded-md">
                                  <span
                                    onClick={() =>
                                      handleQuantityChange(item._id, -1)
                                    }
                                    className="font-bold cursor-pointer"
                                  >
                                    <FaMinus />
                                  </span>
                                  <span className="text-center">
                                    {item.quantity >= 1000
                                      ? `${(item.quantity / 1000).toFixed(
                                          3
                                        )}` // Tons always show 3 decimals
                                      : `${
                                          item.quantity % 1 === 0
                                            ? item.quantity
                                            : item.quantity.toFixed(3)
                                        }`}
                                    {/* For kilograms, show whole number unless decimal exists */}
                                  </span>
                                  <span
                                    onClick={() =>
                                      handleQuantityChange(item._id, 1)
                                    }
                                    className="font-bold cursor-pointer"
                                  >
                                    <FaPlus />
                                  </span>
                                </div>
                                <div>
                                  {item.quantity >= 1000 ?  `Ton` : `Kg` }
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              {(item.price * item.quantity).toFixed(2)} Tk.
                            </td>
                            <td className="px-4 py-2">
                              <RiDeleteBin6Line
                                onClick={() => handleDeleteItem(item._id)}
                                className="cursor-pointer"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-between my-5">
                  <button
                    onClick={handleResetCart}
                    className="mt-4 px-4 sm:px-12 py-2 bg-gray-500 hover:bg-white text-white hover:text-gray-500 hover:border hover:border-gray-500 rounded-lg font-bold"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="mt-4 px-4 sm:px-8 py-2 bg-primary hover:bg-white text-white border hover:text-primary hover:border hover:border-primary rounded-lg"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
              <div className="w-full sm:w-[25%] mt-5 sm:mt-0 h-fit border-gray-300 sticky top-0">
                <div className="w-full text-gray-500 bg-gray-100 border rounded-xl py-6">
                  <div className="w-5/6 mx-auto">
                    <h1 className="text-xl font-semibold my-5">Summary</h1>
                    <div className="flex justify-between font-medium mb-5">
                      <p>Sub-Total</p>
                      <p className="font-semibold">
                        <TbCurrencyTaka className="inline font-bold text-lg" />
                        {calculateSubtotal()}
                      </p>
                    </div>

                    <div className="border-2 mb-5"></div>
                    <div className="flex justify-between mb-5 font-bold text-lg">
                      <p>Total</p>
                      <p className="font-semibold text-primary">
                        <TbCurrencyTaka className="inline font-bold text-lg" />
                        {calculateTotal()}
                      </p>
                    </div>
                  </div>
                </div>
                <Link to="/shop">
                  <button className="w-full text-primary font-bold flex justify-center items-center border mt-8 py-3 rounded-lg hover:text-white hover:bg-primary">
                    <FaArrowLeftLong className="inline me-3" /> Back To Shop
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Containar>
    </div>
  );
};

export default CartDetails;
