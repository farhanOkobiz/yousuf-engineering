import React, { useRef } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FixedCart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total items and total price
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      (item?.selectedOption?.discountValue > 0
        ? item?.selectedOption?.salePrice
        : item?.selectedOption?.price) *
        item.quantity,
    0
  );

  const cartRef = useRef(null);

  // Function to check screen size
  const isSmallDevice = () => window.innerWidth <= 1024;

  // Handle drag functionality
  const handleDragStart = (e) => {
    if (!isSmallDevice()) return; // Disable dragging on large devices
    const cart = cartRef.current;
    const rect = cart.getBoundingClientRect();
    cart.dataset.offsetX = e.clientX - rect.left;
    cart.dataset.offsetY = e.clientY - rect.top;
  };

  const handleDragMove = (e) => {
    if (!isSmallDevice()) return; // Disable dragging on large devices
    const cart = cartRef.current;
    if (!cart.dataset.offsetX || !cart.dataset.offsetY) return;

    const offsetX = parseFloat(cart.dataset.offsetX);
    const offsetY = parseFloat(cart.dataset.offsetY);

    const left = e.clientX - offsetX;
    const top = e.clientY - offsetY;

    // Get screen boundaries
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Get cart dimensions
    const cartRect = cart.getBoundingClientRect();
    const cartWidth = cartRect.width;
    const cartHeight = cartRect.height;

    // Constrain the cart within screen boundaries
    const constrainedLeft = Math.min(
      Math.max(0, left),
      screenWidth - cartWidth
    );
    const constrainedTop = Math.min(
      Math.max(0, top),
      screenHeight - cartHeight
    );

    // Apply the constrained positions
    cart.style.left = `${constrainedLeft}px`;
    cart.style.top = `${constrainedTop}px`;
    cart.style.position = "fixed"; // Ensure it remains fixed while dragging
  };

  const handleDragEnd = () => {
    if (!isSmallDevice()) return; // Disable dragging on large devices
    const cart = cartRef.current;
    delete cart.dataset.offsetX;
    delete cart.dataset.offsetY;
  };

  return (
    <div
      ref={cartRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0])}
      onTouchMove={(e) => handleDragMove(e.touches[0])}
      onTouchEnd={handleDragEnd}
      className="fixed font-inter cursor-pointer bg-bestdealbg border z-[100000] border-secendary rounded-md right-6 top-[50%] text-texthead -translate-y-1/2  shadow-lg"
      style={{
        touchAction: "none", // Disable default touch gestures for smoother dragging
        height: "95px", // Fixed height
        width: "80px", // Fixed width
      }}
    >
      <Link
        to={"/checkout"}
        className="flex flex-col rounded-md justify-center px-2"
      >
        <h2 className="text-xl text-center flex justify-center pt-2">
          <HiOutlineShoppingBag />
        </h2>
        <h4 className="text-sm font-inter text-center">{totalItems}</h4>
        <h4 className="text-xs font-inter text-center uppercase">items</h4>
      </Link>
      <h4 className="flex items-center rounded-b-md mt-0.5 w-full text-white gap-x-0.5 justify-center px-4 py-0.5 bg-secendary">
        ৳ <span className="text-xs ml-1">{totalPrice.toFixed(0)}</span>
      </h4>
    </div>
  );
};

export default FixedCart;
