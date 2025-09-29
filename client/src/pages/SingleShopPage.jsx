import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch to dispatch actions
import SinglePageBradCumbs from "../components/shared/SinglePageBradCumbs";
import Containar from "../components/containar/Containar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../components/axios/Axios";
import BestSellProduct from "../components/shop/BestSellProduct";
import RelatedProductItem from "../components/shop/RelatedProductItem";
import { addToAgroCart } from "../redux/slices/cart/agroCartSlice";
import Skeleton from "react-loading-skeleton";
import "react-toastify/dist/ReactToastify.css";

const SingleShopPage = () => {
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const lastSlug = location.pathname.split("/").pop();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${lastSlug}`);
        setProduct(response.data.data.product);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchProduct();
  }, [lastSlug]);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleBuyNow = () => {
    // dispatch(addToAgroCart({ ...product, quantity: 1 }));
    navigate(`/checkout/${product?._id}`);
  };

  console.log("Product List", product);

  const model = ["XYZ-123", "XYZ-456"];
  const specifications = [
    { label: "Type", typeValue: ["aa", "bb"] },
    { label: "Power", typeValue: ["aa", "bb"] },
    { label: "Weight", typeValue: ["aa", "bb"] },
    { label: "Warranty", typeValue: ["aa", "bb"] },
  ];

  return (
    <div className="font-robo">
      <div className="h-[68px] sm:h-[83.4px]"></div>
      <SinglePageBradCumbs title={product?.title} />
      <Containar>
        <div className="pb-24">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-10">
            <div className="col-span-12">
              <div className="text-[32px] font-bold capitalize">
                {product ? product.title : <Skeleton width={200} />}
              </div>
              <div className="text-[14px] font-normal my-1">
                {product ? (
                  `by ${product?.brand?.title}`
                ) : (
                  <Skeleton width={150} />
                )}
              </div>
              <div className="grid grid-cols-12 md:gap-6 lg:gap-x-5">
                <div className="col-span-12 md:col-span-6">
                  <div className="relative group">
                    <Swiper
                      ref={swiperRef}
                      modules={[Navigation, Pagination]}
                      pagination={{ clickable: true }}
                      spaceBetween={30}
                      slidesPerView={1}
                      className="w-full"
                    >
                      {product?.photos?.length > 0 ? (
                        product.photos.map((item, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={item}
                              className="w-full object-contain"
                              alt="Product"
                            />
                          </SwiperSlide>
                        ))
                      ) : (
                        <SwiperSlide>
                          <Skeleton height={400} />
                        </SwiperSlide>
                      )}
                    </Swiper>
                    <button
                      className="group-hover:border absolute left-0 top-1/2 -translate-y-1/2 text-gray-60 z-20 px-2 py-2 rounded text-gray-400 hover:bg-primary hover:text-white group-hover:border-primary transition duration-300"
                      onClick={handlePrev}
                    >
                      <FaChevronLeft className="" />
                    </button>
                    <button
                      className="group-hover:border absolute right-0 top-1/2 -translate-y-1/2 text-gray-60 z-20 px-2 text-gray-400 py-2 rounded hover:bg-primary hover:text-white group-hover:border-primary transition duration-300"
                      onClick={handleNext}
                    >
                      <FaChevronRight className="" />
                    </button>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="overflow-x-auto p-4 rounded-lg">
                    <table className="w-full border border-gray-300">
                      <tbody>
                        {/* Header Row (Models) */}
                        <tr className="border-b">
                          <th className="px-6 py-3 font-semibold text-center border-r">
                            Model
                          </th>
                          {product?.specification.map((item, index) => (
                            <th
                              key={index}
                              className="px-6 py-3 font-semibold text-center border-r"
                            >
                              {item.model}
                            </th>
                          ))}
                        </tr>

                        {/* Specification Rows */}
                        {product?.specification[0]?.typeValue.map(
                          (subItem, i) => (
                            <tr key={i} className="border-b">
                              <th className="px-6 py-3 text-center font-semibold border-r">
                                {subItem.type}
                              </th>
                              {product?.specification.map((item, index) => (
                                <td
                                  key={index}
                                  className="px-6 py-3 text-center border-r"
                                >
                                  {item.typeValue[i]?.value || "-"}
                                </td>
                              ))}
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5">
                    <div className="text-2xl font-bold">Advantages:</div>
                    <div>
                      {product?.advantages &&
                      Array.isArray(product.advantages) ? (
                        <ul className="list-disc pl-5">
                          {product.advantages.map((advantage, index) => (
                            <li key={index} className="my-3">
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No advantages available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-14">
                <div className="flex gap-1 text-2xl font-bold items-center my-5 text-primary">
                  {product ? (
                    <>
                      <span className="">Price:</span>
                      <FaBangladeshiTakaSign className="" />
                      <span className="">
                        {product.price}
                      </span>
                    </>
                  ) : (
                    <>
                      <Skeleton circle height={20} width={20} />
                      <Skeleton height={24} width={80} />
                      <Skeleton
                        height={24}
                        width={80}
                        style={{ marginLeft: "0.5rem" }}
                      />
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {product ? (
                    <>
                      <button
                        className="w-60 mx-auto rounded-lg text-white bg-primary hover:bg-secondary hover:text-primary border-primary border-2 transition-all ease-linear bg-secendary hover:text-secendary duration-200 font-semibold px-8 text-center py-2"
                        onClick={() => handleBuyNow()}
                      >
                        Order Now
                      </button>
                    </>
                  ) : (
                    <>
                      <Skeleton height={48} width={120} />
                      <Skeleton height={48} width={120} />
                    </>
                  )}
                </div>
              </div>
              <div className="pt-14">
                <div className="py-4 border-b">
                  <h3 className="relative inline-block text-[26px] font-semibold after:absolute after:left-0 after:-bottom-[18px] after:bg-primary after:w-full after:h-[2px]">
                    Description
                  </h3>
                </div>

                <div className="custom-html-content mt-7 leading-8 text-justify">
                  {product ? (
                    <p dangerouslySetInnerHTML={{ __html: product.details }} />
                  ) : (
                    <Skeleton count={5} />
                  )}
                </div>
              </div>
              <div className="text-xl underline text-blue-500 text-center">https://qutexbd.com/</div>
            </div>
          </div>
        </div>
      </Containar>
      <div>
        <Containar className={"border-t"}>
          <div className="py-20">
            <h3 className=" text-[30px] font-bold">Related Products</h3>
            <div>
              {/* ------------- */}
              <div>
                {product ? (
                  <RelatedProductItem
                    slug={product.category.slug}
                    prevProductId={product._id}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton key={index} height={300} />
                    ))}
                  </div>
                )}
              </div>

              {/* -------------- */}
            </div>
          </div>
        </Containar>
      </div>
    </div>
  );
};

export default SingleShopPage;
