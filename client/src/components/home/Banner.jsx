/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { socialLink } from "../constants";
import { useState, useEffect } from "react";
import Containar from "../containar/Containar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api from "../axios/Axios";
import { Swiper, SwiperSlide } from "swiper/react"; // Updated import
import { EffectFade, Autoplay } from "swiper/modules"; // Updated import
import "swiper/swiper-bundle.css"; // Ensure to include the CSS
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bannerData, setBannerData] = useState([]); // State to hold banner data
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await api.get("/banners");
        const mainBanners = response.data.data.doc
          .reverse()
          .filter((banner) => banner.bannerType === "main");
        setBannerData(mainBanners);
        // console.log("bannerData", bannerData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setIsLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  return (
    <div className="">
      <div className="h-[85px] bg-white sm:hidden"></div>
      <div className="font-robo relative h-[260px] md:h-[60vh] lg:h-screen w-full sm:overflow-hidden">
        {/* Overlay - Fix: Move it outside Swiper to avoid multiple opacity */}
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-black opacity-50"></div>

        {isLoading ? (
          <Skeleton height="100vh" />
        ) : bannerData.length > 0 ? (
          <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            speed={1000}
            autoplay={{ delay: 15000, disableOnInteraction: false }} // Set delay to 2000ms
            className="absolute top-0 left-0 w-full h-full"
          >
            {bannerData.map((banner, index) => (
              <SwiperSlide key={index}>
                {banner.mediaType === "video" ? (
                  <video
                    className="w-full h-full object-cover pointer-events-none"
                    src={banner.photo}
                    autoPlay
                    loop
                    muted
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center overflow-hidden">
                    <img
                      className="w-full h-full  transition-transform duration-500 ease-in-out transform hover:scale-110"
                      src={banner.photo}
                      alt={banner.title}
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-white">No banners available.</p>
        )}

        <div className="z-50 absolute bottom-5 sm:bottom-32 md:bottom-5 lg:bottom-20 xl:bottom-24 2xl:bottom-40 sm:left-1/2 sm:-translate-x-1/2 height-600:bottom-5 height-900:bottom-10">
          <Containar>
            <ul className="flex flex-col sm:flex-row items-center flex-wrap gap-x-1 gap-y-2 sm:gap-x-4 xl:gap-x-[20px] mt-3 ">
              {isLoading
                ? Array(socialLink.length)
                    .fill(0)
                    .map((_, index) => (
                      <li
                        key={index}
                        className="w-5 sm:w-10 h-5 sm:h-10 flex items-center justify-center"
                      >
                        <Skeleton circle={true} height={40} width={40} />
                      </li>
                    ))
                : socialLink.map((item, index) => {
                    const Icon = item?.icon;
                    return (
                      <li className="text-black" key={index}>
                        <Link
                          className={`w-5 sm:w-10 h-5 sm:h-10 justify-center bg-white hover:scale-125 transition-all ease-linear duration-150 items-center flex rounded-full text-[10px] sm:text-[15px] hover:text-white`}
                          to={item?.link}
                          target="_blanck"
                          style={{ color: item?.color }}
                        >
                          <Icon />
                        </Link>
                      </li>
                    );
                  })}
            </ul>
          </Containar>
        </div>

        {/* Content */}
        <div className="relative z-20 text-white  flex justify-center items-center h-full">
          <Containar>
            <div className="w-full text-center ">
              <>
                <h3 className="text-[12px] md:text-[16px] lg:text-[18px] xl:text-[28px]  font-normal">
                  {bannerData.length > 0 ? bannerData[0].title : "Loading..."}
                </h3>
                <p className="mt-[10px] mb-6 sm:mb-0 text-[20px] max-w-[1070px] mx-auto md:text-[40px] xl:text-[58px] font-semibold   font-robo capitalize">
                  {bannerData.length > 0
                    ? bannerData[0].subTitle
                    : "Loading..."}
                </p>

                <Link
                  to={"/contact-us"}
                  className="px-3 sm:px-[25px] sm:py-[10px] xl:px-[50px] xl:py-[15px] py-[6px] inline-block bg-primary transition-all ease-linear duration-150 hover:bg-secondary hover:text-primary text-[14px] sm:text-base xl:text-[18px] mt-8 sm:mt-10 font-semibold text-white rounded-lg"
                >
                  Contact Us Now
                </Link>
              </>
            </div>
          </Containar>
        </div>
      </div>
    </div>
  );
};

export default Banner;
