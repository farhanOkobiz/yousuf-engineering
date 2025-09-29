/* eslint-disable react/no-unknown-property */
import service1 from "../../assets/service-1.png";
import service2 from "../../assets/service-4 1.png";
import service3 from "../../assets/service-3.png";
import service4 from "../../assets/service-4.png";
import leafIcon from "../../assets/home/leaf-icon3.png";
import Containar from "../containar/Containar";
import { useEffect, useState, useRef } from "react"; // Import useRef
import api from "../axios/Axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import Autoplay
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null); // Create a reference for the swiper instance

  // Function to fetch services
  const getServices = async () => {
    try {
      const response = await api.get(`/services`);
      setServices(response.data?.data); // Set the services data
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      setError(error.message); // Handle error
      setLoading(false); // Set loading to false if error occurs
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="bg-white font-robo">
      <Containar>
        <div className="py-[60px] sm:py-[105px]">
          <div className="text-center relative">
            <div className="flex justify-center">
              <img className="w-[70px]" src={leafIcon} alt="leaf-icon" />
            </div>
            <div className="text-center my-7">
              <h5 className="text-[16px] sm:text-[21px] font-semibold mb-4 uppercase text-primary">
                Our Sewing Machine Company
              </h5>
              <h2 className="text-xl sm:text-3xl font-bold max-w-xl mx-auto">
                We’re a World-Leading Provider of Sewing Machines & Related
                Services
              </h2>
            </div>
            {loading ? (
              <div>
                <Skeleton height={480} />
              </div>
            ) : (
              <>
                {services?.doc?.length > 0 ? (
                  <div className="relative">
                    <Swiper
                      ref={swiperRef}
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={30}
                      slidesPerView={1}
                      loop={true}
                      speed={1000}
                      pagination={{ clickable: true }}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      className="my-16 relative"
                      breakpoints={{
                        540: { slidesPerView: 2 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                      }}
                    >
                      {}
                      {services?.doc?.map((service) => (
                        <SwiperSlide key={service._id}>
                          <div className="rounded-lg overflow-hidden group bg-white border-2 pb-10">
                            <div className="h-[297px] overflow-hidden">
                              <img
                                src={service?.photo} // Use the actual image source
                                alt={service.heading}
                                className="w-full h-full rounded-none object-cover"
                              />
                            </div>

                            {/* Icon and Content */}
                            <div className="-mt-10 text-center">
                              <div className="flex justify-center items-center mb-4">
                                <div className="bg-primary group-hover:bg-secondary group-hover:text-primary border-primary border-2 transition-all ease-linear duration-150 text-white rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                  <h3 className="text-[24px]">
                                    <i
                                      className={
                                        service?.icon?.match(
                                          /className=['"]([^'"]+)['"]/
                                        )?.[1] || "fa-solid fa-tools" // Default to 'fa-tools' if no icon
                                      }
                                    ></i>
                                  </h3>
                                </div>
                              </div>

                              {/* Title */}
                              <h2 className="font-semibold text-[20px] mb-5 robo line-clamp-1 px-2">
                                {service.heading}
                              </h2>

                              {/* Description */}
                              <p
                                className="text-gray-600 text-sm px-5 line-clamp-2"
                                dangerouslySetInnerHTML={{
                                  __html: service.details,
                                }} // This will render the HTML content
                              ></p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <button
                      onClick={handlePrev}
                      className="z-10 hidden xl:block rounded-full p-2 absolute -translate-y-1/2 -left-10 top-[50%] bg-primary text-white"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={handleNext}
                      className="z-10 hidden xl:block rounded-full p-2 absolute -translate-y-1/2 -right-10 top-[50%] bg-primary text-white"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                ) : (
                  <p className="h-32 flex items-center justify-center text-2xl font-semibold text-primary">
                    No Service Available!
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default Service;
