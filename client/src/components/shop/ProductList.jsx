import { useState } from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaBangladeshiTakaSign, FaFilter, FaList } from "react-icons/fa6";
import SortOption from "./SortOption";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToAgroCart } from "../../redux/slices/cart/agroCartSlice";

const ProductList = ({ products, loading }) => {
  const sortOption = useSelector((state) => state.sort.sortOption);
  const [gridOrList, setGridOrList] = useState(true);
  const [isShopDrawerOpen, setShopDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products found</p>;
  }

  const handleBuyNow = (product) => {
    dispatch(addToAgroCart({ ...product, quantity: 1 }));
    // if (token) {
    //   navigate("/checkout");
    // } else {
    //   navigate("/login");
    // }
    navigate(`/checkout/${product?._id}`);
  };

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
                    <Link to={`/shop/${product?._id}`}>
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
                <div className="text-left px-4">
                  <p className="font-medium line-clamp-3  hover:underline hover:text-blue-700  text-[0.75rem] md:text-[1rem] mt-7 mb-2 capitalize">
                    <Link to={`/shop/${product?.slug}`}>{product?.title}</Link>
                  </p>
                  {
                    product?.price && <p className="text-[0.75rem] md:text-[1rem] font-bold text-[#00AEEF] flex items-center">
                      <FaBangladeshiTakaSign className="mr-1" />
                      <span>
                        <span className="text-[0.75rem] font-semibold md:text-[1rem] text-[#00AEEF]"></span> {product?.price}
                      </span>
                    </p>
                  }

                  <div className="flex justify-between items-center mt-3">
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
      ) : (
        <div className="px-5 py-14">
          <div className="flex flex-col gap-y-10">
            {products?.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-12 lg:gap-x-10 pb-8 border-b"
              >
                <div className="col-span-12 md:col-span-4">
                  <div className="w-full">
                    <Link to={`/shop/${product?._id}`}>
                      <img src={product?.photos[0]} className="rounded-lg" />
                    </Link>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <Link
                    to={`/shop/${product?.slug}`}
                    className="text-[0.75rem] hover:text-[#222] underline line-clamp-3  md:text-[1rem] font-semibold text-text capitalize"
                  >
                    {product?.title}
                  </Link>

                  <p className="text-gray-600 text-[14px] line-clamp-3 leading-7 mt-3">
                    {product?.details.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>

                  {product?.price && <p className="flex items-center text-[0.75rem] md:text-[1rem] text-blue-900 mt-5">
                    <FaBangladeshiTakaSign className="inline-block mr-1" />
                    <span>
                      <span className="text-[0.75rem] md:text-[1rem] font-bold text-blue-900"></span> {product?.price}
                    </span>
                  </p>}
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
    </>
  );
};

export default ProductList;
