// import product1 from "../../assets/product-1.png";
// import leaves from "../../assets/home/leaves-1-2.png";
import leafIcon from "../../assets/home/leaf-icon3.png";
import Containar from "../containar/Containar";
// import { IoCart } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import api from "../axios/Axios";
import { addToAgroCart } from "../../redux/slices/cart/agroCartSlice";
import { useDispatch } from "react-redux";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [, setError] = useState(null);
  const navigate = useNavigate();
  // const swiperRef = useRef(null); 
  // const token = useSelector((state) => state.auth.token);

  const handleBuyNow = (product) => {
    dispatch(addToAgroCart({ ...product, quantity: 1 }));
    navigate(`/checkout/${product?._id}`);
  };

  const getProducts = async () => {
    try {
      const response = await api.get(`/products?limit=12`);
      setProducts(response.data?.data); // Set the product data
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      setError(error.message); // Handle error
      setLoading(false); // Set loading to false if error occurs
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // const handleNext = () => {
  //   if (swiperRef.current) {
  //     swiperRef.current.swiper.slideNext();
  //   }
  // };

  // const handlePrev = () => {
  //   if (swiperRef.current) {
  //     swiperRef.current.swiper.slidePrev();
  //   }
  // };

  return (
    <div className="bg-[#FBF7F0] py-12 sm:pt-[110px] sm:pb-[130px] font-robo relative group">
      <Containar>
        <div className="py-2 ">
          <div className="text-center">
            <div className="flex justify-center">
              <img
                src={leafIcon}
                className="w-[50px] sm:w-[70px]"
                alt="leaf-icon"
              />
            </div>
            <div className="text-center mt-[10px]">
              <h5 className="text-primary font-bold text-[16px] sm:text-xl mb-3 leading-8 sm:leading-[58px] uppercase tracking-widest">
                Our Latest Products
              </h5>
              <h2 className="text-[20px] sm:text-[36px] max-w-3xl mx-auto font-semibold mb-3">
                Explore Our Latest Products.
              </h2>
            </div>

            <div>
              {loading ? (
                <div>
                  <Skeleton height={480} />
                </div>
              ) : (
                <>
                  {products?.doc?.length > 0 ? (
                    <>
                      <div className="">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {products?.doc?.map((product) => (
                            <>
                              <div
                                key={product._id}
                                className="rounded-lg overflow-hidden bg-white pb-4 group/edit flex flex-col justify-between"
                              >
                                <div className="">
                                  <Link to={`/shop/${product?.slug}`}>
                                    <img
                                      src={product?.photos[0]}
                                      alt={product?.title || "Product Image"}
                                      className="w-full h-[305px] rounded-none object-cover aspect-square"
                                    />
                                  </Link>
                                </div>

                                <div className="p-4 flex flex-col justify-between">
                                  <div className="">
                                    <Link
                                      to={`/shop/${product?.slug}`}
                                      className="font-bold text-[1rem] line-clamp-3 mb-2 capitalize"
                                    >
                                      <span className="text-[1rem]">{product?.title} </span>
                                    </Link>

                                    <p className="flex items-center justify-center space-x-1 text-gray-600 text-[16px] mt-5">
                                      {product?.price ? (
                                        <>
                                          <FaBangladeshiTakaSign className="inline" />
                                          <span>{product?.price}</span>
                                        </>
                                      ) : (
                                        <span>&nbsp;</span>
                                      )}
                                    </p>
                                  </div>
                                  <div className="flex justify-between items-center mt-5">
                                    <button
                                      onClick={() => handleBuyNow(product)}
                                      className="rounded-full text-white bg-primary hover:bg-secondary hover:text-primary border-primary border-2 transition-all ease-linear duration-150 px-4 py-2 text-sm w-full"
                                    >
                                      Order Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                        <div className="mt-8 text-center">
                          <Link
                            to="/shop"
                            className="w-28 mx-auto px-6 py-3 text-lg font-medium text-white bg-primary rounded-full hover:transform hover:scale-110 transition-all ease-linear duration-200"
                          >
                            See all products
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="h-32 flex items-center justify-center text-2xl font-semibold text-primary">
                      No Products Available!
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default Product;
