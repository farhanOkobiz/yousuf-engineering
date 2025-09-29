import { useState, useEffect } from "react";
import { FaHome, FaShoppingCart, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled past 100px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check if the user has reached the bottom of the page
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight;
      setIsAtBottom(isBottom);

      if (isBottom) {
        setIsVisible(false); // Hide the footer when at the bottom of the page
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-secendary text-white flex justify-around items-center py-1 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } md:hidden`}
    >
      <div>
        <Link to="/" className="flex flex-col items-center">
          <FaHome size={20} />
          <p className="text-xs mt-1">Home</p>
        </Link>
      </div>
      <div>
        <Link to={"/shop"} className="flex flex-col items-center">
          <FaShoppingCart size={20} />
          <p className="text-xs mt-1">Shop</p>
        </Link>
      </div>
      <div>
        <Link to="/contact" className="flex flex-col items-center">
          <FaPhone size={20} />
          <p className="text-xs mt-1">Contact</p>
        </Link>
      </div>
    </div>
  );
};

export default FooterMenu;
