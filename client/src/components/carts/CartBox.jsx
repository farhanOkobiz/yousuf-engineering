import React from "react";
import Containar from "../../layouts/Containar";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
  resetCart,
} from "../../redux/slices/cartSlices";
import { PiPercentBold } from "react-icons/pi";

const CartBox = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // console.log(cartItems, "............Items..........");

  // Calculate totals
  const totalItems = cartItems.reduce(
    (total, item) => total + item?.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      (item?.selectedOption?.discountValue > 0
        ? Math?.ceil(item?.selectedOption?.salePrice)
        : item?.selectedOption?.price) *
        item?.quantity,
    0
  ); // Example static value for tax
  const total = subtotal;

  return (
    <section className="">
      <Containar>
        {cartItems?.length > 0 ? (
          <div className="py-10 md:py-20 font-inter">
            <div>
              <h2 className="text-xl text-center font-medium text-texthead uppercase">
                Your Cart: (<span>{totalItems}</span>) items
              </h2>
              <div className="mt-10 grid grid-cols-12 sm:gap-x-8">
                <div className="col-span-12 lg:col-span-9">
                  <ul className="flex items-center px-8 h-20 bg-white border-b-2 border-b-border shadow-sm">
                    <li className="uppercase w-[4%] text-base font-medium"></li>
                    <li className="uppercase w-[39%] text-base font-medium">
                      Product
                    </li>
                    <li className="uppercase w-[21%] text-base font-medium">
                      Price
                    </li>
                    <li className="uppercase w-[25%] text-base font-medium">
                      Quantity
                    </li>
                    <li className="uppercase w-[10%] text-base font-medium">
                      Subtotal
                    </li>
                  </ul>
                  {cartItems?.map((item) => (
                    <ul
                      key={item?.id}
                      className="md:flex items-center py-5 border-b border-b-border bg-white hidden lg:flex"
                    >
                      <li
                        className="w-[4%] text-xl px-2 text-danger hover:text-texthead transition-all ease-linear font-medium cursor-pointer"
                        onClick={() =>
                          dispatch(
                            deleteFromCart({
                              id: item?._id,
                              colorOptionId: item?.selectedOption?._id,
                              selectedSize: item?.selectedSize,
                            })
                          )
                        }
                      >
                        <RxCross2 className="text-red-500" />
                      </li>
                      <li className="w-[39%] font-medium">
                        <div className="flex gap-x-4 items-center">
                          <div className="w-[90px] relative">
                            {/* Check if photos exist */}
                            {item?.photos && item?.photos.length > 0 ? (
                              <img
                                className="w-full h-40 object-contain"
                                src={item?.photos[0]}
                                alt={item?.name}
                              />
                            ) : (
                              <p>No image available</p> // Fallback content
                            )}
                            {item?.selectedOption?.discountValue > 0 && (
                              <p className="text-xs cursor-pointer absolute right-1 -top-0.5 mt-2 px-2 text-white rounded-md py-0.5 bg-danger inline-block">
                                {item?.selectedOption?.discountType ===
                                "amount" ? (
                                  <span className="flex font-bold items-center gap-x-0.5">
                                    ৳ {item?.selectedOption?.discountValue}
                                  </span>
                                ) : (
                                  <span className="flex font-bold items-center gap-x-0.5">
                                    {item?.selectedOption?.discountValue}{" "}
                                    <PiPercentBold />
                                  </span>
                                )}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-normal ">
                              <Link to={`/shop/brand/${item?.brand?._id}`}>
                                {item?.brand?.title}
                              </Link>
                            </p>
                            <h2 className="text-base mt-3 font-medium cursor-pointer hover:text-danger transition-all ease-linear duration-200 text-texthead">
                              <Link
                                to={`/productdetail/${item?.name}/${item?._id}`}
                              >
                                {item?.name?.slice(0, 300)}
                              </Link>
                            </h2>
                            {item?.userChoiceColor &&
                            item?.userChoiceColor?.length > 0 ? (
                              <p className="text-sm mt-3 font-normal capitalize">
                                <span className="mr-2">Color:</span>
                                {item?.userChoiceColor}
                              </p>
                            ) : (
                              <p className="text-sm mt-3 font-normal ">
                                <Link
                                  to={`/shop/category/${item?.category?._id}/${item?.category?.title}`}
                                >
                                  {item?.category?.title}
                                </Link>
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                      <li className="w-[21%] text-base font-medium">
                        <p className="flex items-center gap-x-1">
                          <span>৳</span>
                          {item?.selectedOption?.discountValue > 0 ? (
                            <span className="flex gap-x-2">
                              {Math?.ceil(item?.selectedOption?.salePrice)}
                              <del>{item?.selectedOption?.price}</del>
                            </span>
                          ) : (
                            <span>{item?.selectedOption?.price}</span>
                          )}
                        </p>
                      </li>
                      <li className="w-[25%] text-base font-medium">
                        <div className="h-14 flex">
                          <div className="border h-full flex items-center">
                            <div
                              onClick={() =>
                                dispatch(
                                  decrementQuantity({
                                    id: item?._id,
                                    colorOptionId: item?.selectedOption._id,
                                    selectedSize: item?.selectedSize,
                                  })
                                )
                              }
                              className="w-14 h-full flex justify-center items-center cursor-pointer"
                            >
                              <h3 className="text-texthead text-sm">
                                <FaMinus />
                              </h3>
                            </div>
                            <div className="flex min-w-[40px] justify-center items-center">
                              <h3 className="text-texthead text-base px-3">
                                {item.quantity}
                              </h3>
                            </div>
                            <div
                              onClick={() =>
                                dispatch(
                                  incrementQuantity({
                                    id: item?._id,
                                    colorOptionId: item?.selectedOption._id,
                                    selectedSize: item?.selectedSize,
                                  })
                                )
                              }
                              className="w-14 h-full flex justify-center items-center cursor-pointer"
                            >
                              <h3 className="text-texthead text-sm">
                                <FaPlus />
                              </h3>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="w-[10%] text-base font-medium">
                        <p className="flex items-center gap-x-1">
                          <span>৳</span>
                          <span>
                            {(
                              (item?.selectedOption?.discountValue > 0
                                ? Math?.ceil(item?.selectedOption?.salePrice)
                                : item?.selectedOption?.price) * item?.quantity
                            ).toFixed(0)}
                          </span>
                        </p>
                      </li>
                    </ul>
                  ))}

                  <div className="mt-10 px-5 xl:px-0">
                    <div>
                      <button
                        onClick={() => dispatch(resetCart())}
                        className="rounded px-8 py-3 border border-secendary bg-secendary text-base font-medium  duration-300 text-white hover:bg-red-700"
                      >
                        Reset Cart
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 mt-10 lg:mt-0 lg:col-span-3 px-5 xl:px-0">
                  <div className="border border-texthead">
                    <div className="flex h-20 uppercase bg-primary text-white border-b-2 border-b-border items-center font-medium px-8 shadow-sm">
                      <h3>Cart Totals</h3>
                    </div>

                    <div className="px-8 py-8 bg-white  border-t-border">
                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-medium text-texthead uppercase">
                          Total
                        </h3>
                        <h3 className="text-sm font-bold tracking-wider flex items-center gap-x-0.5 text-green-600">
                          <span>৳</span>
                          {total.toFixed(0)}
                        </h3>
                      </div>
                      <div className="mt-6 flex justify-center items-center gap-x-2">
                        <Link
                          to={"/checkout"}
                          className="btn btn-danger flex justify-center bg-secendary items-center gap-x-3 py-3 text-white w-full font-medium"
                        >
                          <HiOutlineShoppingBag className="text-xl" />
                          <span>Proceed to checkout</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20">
            <div className="flex justify-center items-center">
              <HiOutlineShoppingBag className="text-[240px]" />
            </div>
            <h2 className="text-center text-2xl font-medium mt-5">
              Your cart is currently empty.
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
      </Containar>
    </section>
  );
};

export default CartBox;
