import { useEffect, useState, useRef } from "react";
// import { IoCart } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBangladeshiTakaSign,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import api from "../axios/Axios";
import { addToAgroCart } from "../../redux/slices/cart/agroCartSlice";
import { useDispatch } from "react-redux";

// eslint-disable-next-line react/prop-types
const RelatedProductItem = ({ slug, prevProductId }) => {
  const [products, setProducts] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const containerRef = useRef(null);
  const slideRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [navTop, setNavTop] = useState(null);
  // const token = useSelector((state) => state.auth.token);
  // const handleAddtoCart = (product) => {
  //   // console.log("product", product);
  //   // if(){

  //   // }
  //   // dispatch(addToAgroCart({ ...product, quantity: 1 }));
  //   //   navigate(`/checkout/${product?._id}`);
  //   // }
  // };
  const handleBuyNow = (product) => {
    dispatch(addToAgroCart({ ...product, quantity: 1 }));
    // navigate("/checkout");
    navigate(`/checkout/${product?._id}`);
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await api.get(`/category/${slug}/products`);
        const filteredProducts = response.data.data?.products.filter(
          (product) => product.id !== prevProductId // Filter out the previous product
        );
        setProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchCategoryProducts();
  }, [slug, prevProductId]);

  // Ensure Swiper can access the navigation buttons after they are rendered
  useEffect(() => {
    if (swiperInstance && swiperInstance.params.navigation) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  // Measure first slide/card and position nav buttons vertically centered to it
  useEffect(() => {
    const updateNavTop = () => {
      const container = containerRef.current;
      const slide = slideRef.current;
      if (container && slide) {
        const containerRect = container.getBoundingClientRect();
        const slideRect = slide.getBoundingClientRect();
        const top = slideRect.top - containerRect.top + slideRect.height / 2;
        setNavTop(Math.round(top));
      }
    };

    // run after render
    updateNavTop();
    window.addEventListener("resize", updateNavTop);
    return () => window.removeEventListener("resize", updateNavTop);
  }, [products, swiperInstance]);

  return (
    <div ref={containerRef} className="mt-8 relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        loop={true}
        speed={1000}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="relative"
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              ref={index === 0 ? slideRef : null}
              className="rounded-lg bg-white border group overflow-hidden"
            >
              <div className="relative">
                <Link
                  className="overflow-hidden block h-[305px]"
                  to={`/shop/${item?._id}`}
                >
                  <img
                    src={item?.photos[0]}
                    alt={item?.title}
                    className="w-full h-full group-hover:scale-105 transition-all ease-linear duration-150 aspect-square rounded-t-lg object-cover"
                  />
                </Link>

                {/* <div className="bg-primary group-hover:bg-secondary transition-all ease-linear duration-150 text-white absolute right-4 -bottom-6 rounded-full border-4 border-white flex justify-center items-center w-16 h-16">
                  <p className="text-base">{item?.size}</p>
                </div> */}
              </div>
              {/* Icon and Content */}
              <div className="mt-7 p-4 text-justify">
                <Link
                  to={`/shop/${item?.slug}`}
                  className="font-bold md:text-[1rem] text:[0.75rem] mb-2 line-clamp-3 capitalize inline-block"
                >
                  <span className="font-bold "> {item?.title}</span>
                </Link>
                {item.price && (
                  <div className="flex items-center gap-4">
                    <p className="flex items-center justify-center space-x-1 text-gray-600 text-[16px] mt-3">
                      {item?.price ? (
                        <>
                          <FaBangladeshiTakaSign className="inline" />
                          <span >{item?.price}</span>
                        </>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </p>
                    <p className="flex items-center justify-center space-x-1 text-gray-600 text-[16px] mt-3">
                      {item?.discount ? (
                        <>
                          <FaBangladeshiTakaSign className="inline" />
                          <span className="line-through text-red-500 ">
                            {item?.discount}
                          </span>
                        </>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </p>
                  </div>
                )}

                <div className="flex justify-start items-center mt-5">
                  <button
                    onClick={() => handleBuyNow(item)}
                    className="rounded-full hover:bg-secondary hover:text-primary border-primary border-2 transition-all ease-linear duration-150 text-white bg-primary px-8 py-2 text-sm"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        style={navTop != null ? { top: `${navTop}px` } : undefined}
        className="bg-[#178843] hover:bg-secondary hover:text-primary border-primary border-2 transition-all ease-linear duration-150 text-white rounded-full p-2 absolute -left-4 z-10 -translate-y-1/2"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      <button
        ref={nextRef}
        style={navTop != null ? { top: `${navTop}px` } : undefined}
        className="bg-[#178843] hover:bg-secondary hover:text-primary border-primary border-2 transition-all ease-linear duration-150 text-white rounded-full p-2 absolute -right-4 z-10 -translate-y-1/2"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default RelatedProductItem;
