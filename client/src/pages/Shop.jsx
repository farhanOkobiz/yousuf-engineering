import { useEffect, useState, useCallback } from "react";
import Containar from "../components/containar/Containar";
// import Product from "../components/home/Product";
// import BradCumbs from "../components/shared/BradCumbs";
// import HeroBanner from "../components/shop/HeroBanner";
import Skeleton from "react-loading-skeleton"; // Import skeleton loader
import "react-loading-skeleton/dist/skeleton.css";

import { FaChevronRight } from "react-icons/fa6";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// import { FaChevronLeft, FaList } from "react-icons/fa";
// import ProductGridShopPage from "../components/shop/ProductGridShopPage";
import api from "../components/axios/Axios";
import { Link, Outlet, useLocation } from "react-router-dom";
import ProductList from "../components/shop/ProductList";
// import PriceRange from "../components/shop/PriceRange";
// import { FaFilter } from "react-icons/fa6";

const Shop = () => {

  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(9);
  const isCategoryPath = location.pathname.startsWith("/shop/category");
  const isBrandPath = location.pathname.startsWith("/shop/brand");

  const categoryName = isCategoryPath ? location.pathname.split("/").pop() : "";
  const brandName = isBrandPath ? location.pathname.split("/").pop() : "";



  const getCategory = async () => {
    try {
      const response = await api.get(`/category`);
      setCategoryList(response.data.data.categories);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getBrand = async () => {
    try {
      const response = await api.get(`/brand`);
      setBrandList(response.data.data.brands);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getProducts = useCallback(async (limitArg) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/products?limit=${limitArg}`);

      // API shape: { status, results, totalData, data: { doc: [...] } }
      const docs = response.data?.data?.doc || [];
      const results = response.data?.results ?? docs.length;
      const totalData = response.data?.totalData ?? results;

      // Store doc array plus metadata so UI can compare doc length vs totalData
      setProducts({ doc: docs, results, totalData });

      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategory();
    getBrand();
    // load first `limit` products on mount
    getProducts(limit);
  }, [getProducts, limit]);

  // const handlePrev = () => {
  //   if (swiperRef.current) {
  //     swiperRef.current.swiper.slidePrev();
  //   }
  // };

  // const handleNext = () => {
  //   if (swiperRef.current) {
  //     swiperRef.current.swiper.slideNext();
  //   }
  // };

  const lastSlug = location.pathname.split("/").pop();

  return (
    <>
      <div className="h-[68px] sm:h-[83.4px] bg-[#f5f5f5] font-robo "></div>
      <Containar>
        <div className="flex gap-2 items-center py-10">
          <Link className="font-medium" to={"/"}>
            Home{" "}
          </Link>
          <FaChevronRight className="text-[12px]" />
          <Link className="font-medium" to={"/shop"}>
            Shop
          </Link>
          {isCategoryPath && (
            <>
              <FaChevronRight className="text-[12px]" />
              <h3 className="capitalize">{categoryName}</h3>
            </>
          )}
          {isBrandPath && (
            <>
              <FaChevronRight className="text-[12px]" />
              <h3 className="capitalize">{brandName}</h3>
            </>
          )}
        </div>
      </Containar>

      <div className="py-5 md:py-8 lg:py-14 bg-[#f5f5f5]">
        <Containar>
          {/* <div className="grid grid-cols-12 gap-5 lg:pb-3">
            <div className="hidden lg:block col-span-3">
              <div className="h-[480px]">
                {isLoading ? (
                  <Skeleton height={480} />
                ) : (
                  <HeroBanner newRelease={newRelease} />
                )}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="mb-5 lg:mb-10 relative">
                {isLoading ? (
                  <Skeleton height={480} />
                ) : (
                  <>
                    <Swiper
                      ref={swiperRef}
                      modules={[Autoplay, Pagination, Navigation]}
                      spaceBetween={30}
                      centeredSlides={true}
                      speed={1000}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={false}
                      className="mySwiper"
                    >
                      {deals?.map((deal) => (
                        <SwiperSlide key={deal._id}>
                          <Link to={deal?.link}>
                            <div className="relative h-60 md:h-[480px] bg-cover bg-center shadow-sm border">
                              <img
                                className="w-full h-full"
                                src={deal?.photo}
                              />
                            </div>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <button
                      onClick={handlePrev}
                      className="absolute top-1/2 left-0 transform z-30 -translate-y-1/2 bg-primary text-white w-10 h-10 hidden lg:flex justify-center items-center"
                    >
                      <FaChevronLeft className="" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute top-1/2 right-0 transform z-30 -translate-y-1/2 w-10 h-10 bg-primary text-white hidden lg:flex justify-center items-center"
                    >
                      <FaChevronLeft className="rotate-180" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div> */}

          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-3 hidden lg:block ">
              <div className="sticky top-[88px]">
                {/* Brand Filter */}
                <div className="shadow-md">
                  <div className="w-full bg-[#00AEEF] mb-2 rounded-md ">
                    <div>
                      <h3 className="uppercase tracking-wide text-[18px] py-3.5 px-3 font-bold">
                        Brand
                      </h3>
                    </div>
                  </div>

                  {isLoading ? (
                    <Skeleton count={6} height={50} />
                  ) : (
                    brandList.map((item, index) => (
                      <Link
                        to={`/shop/brand/${item?.slug}`}
                        className={`w-full ${item?.slug == lastSlug
                          ? "bg-primary text-white"
                          : "bg-white"
                          }  border-l border-b border-r inline-block`}
                        key={index}
                      >
                        <div>
                          <h3 className="text-[0.75rem] font-semibold uppercase py-3 px-3">
                            {item?.title}
                          </h3>
                        </div>
                      </Link>
                    ))
                  )}
                </div>

                <div className="shadow-md mt-10">
                  <div className="w-full  bg-[#00AEEF] mb-2 rounded-md">
                    <div>
                      <h3 className="uppercase tracking-wide text-[1rem] py-3.5 px-3 font-bold">
                        Product Category
                      </h3>
                    </div>
                  </div>

                  {isLoading ? (
                    <Skeleton count={6} height={50} />
                  ) : (
                    categoryList.map((item, index) => (
                      <Link
                        to={`/shop/category/${item?.slug}`}
                        className={`w-full ${item?.slug == lastSlug
                          ? "bg-primary text-white"
                          : "bg-white"
                          }  border-l border-b border-r inline-block`}
                        key={index}
                      >
                        <div>
                          <h3 className="text-[0.75rem] font-semibold uppercase py-3 px-3">
                            {item?.title}
                          </h3>
                        </div>
                      </Link>
                    ))
                  )}
                </div>

                {/* <PriceRange /> */}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9 sm:col-span-12">
              <div className="bg-white w-full">
                {isCategoryPath || isBrandPath ? (
                  <Outlet />
                ) : (
                  <>
                    <ProductList products={products?.doc} loading={isLoading} />

                    <div className="flex justify-center py-6">
                      {products?.doc && products?.totalData > (products?.doc?.length || 0) ? (
                        <button
                          onClick={() => {
                            const nextLimit = limit + 9;
                            setLimit(nextLimit);
                          }}
                          disabled={isLoading}
                          className="px-4 py-2 bg-primary text-white rounded"
                        >
                          {isLoading ? "Loading..." : "Load more"}
                        </button>
                      ) : (
                        <p className="text-gray-500">No more products</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* <div className="col-span-12 lg:col-span-9 sm:col-span-12">
              <div className="bg-white w-full">
                <Outlet />
              </div>
            </div> */}
          </div>
        </Containar>
      </div>
    </>
  );
};

export default Shop;
