
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import bradcumbImg1 from "../../assets/bardcumbs/5170.webp";
import bradcumbImg2 from "../../assets/bardcumbs/12305.jpg";
import bradcumbImg5 from "../../assets/bardcumbs/12305.webp";
import bradcumbImg3 from "../../assets/bardcumbs/bg-9.webp";
import bradcumbImg4 from "../../assets/bardcumbs/breadcrumb1.jpg";
import aircondition from "../../assets/bardcumbs/header_air.png";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Containar from "../containar/Containar";

// eslint-disable-next-line react/prop-types
const BradCumbs = ({ title, brad, brad2, bradLink }) => {
  const images = [bradcumbImg5, bradcumbImg1, bradcumbImg2, bradcumbImg3, bradcumbImg4, aircondition];

  return (
    <div>
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        loop={true}
        speed={2000}
        autoplay={{ delay: 3000 }}
        className="relative bg-center bg-cover "
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative py-12 sm:py-28 overflow-hidden">

              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-top transition-transform duration-[8000ms] ease-in-out scale-100"
                style={{ animation: "zoom-in 8s ease-in-out infinite" }}
              />

              {/* Black Overlay */}
              <div className="absolute w-full inset-0 bg-black opacity-0"></div>
              <Containar>
                {/* Content inside the overlay, unaffected by zoom */}
                <div className="relative w-full z-10 flex justify-center  h-full text-white">
                  <div className="  w-full">
                    <h1 className="font-semibold text-3xl text-center">
                      {title}
                    </h1>
                    <div className="flex gap-x-2 justify-center mt-5 items-center">
                      <Link className="mr-1" to={"/"}>
                        Home
                      </Link>
                      <span className="text-sm mt-0.5">
                        <IoIosArrowForward />
                      </span>
                      {!brad2 ? (
                        <p className="mr-1 text-gray-300">{brad}</p>
                      ) : (
                        <Link to={bradLink}>{brad}</Link>
                      )}

                      {brad2 && (
                        <>
                          <span className="text-sm mt-0.5">
                            <IoIosArrowForward />
                          </span>
                          <p className="mr-1 text-gray-300">{brad2}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div></div>
              </Containar>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Zoom-in Animation for Image Only */}
      <style >{`
        @keyframes zoom-in {
          0% {
            transform: scale(1); /* Start at normal size */
          }
          100% {
            transform: scale(1.1); /* Zoom in slightly */
          }
        }
      `}</style>
    </div>
  );
};

export default BradCumbs;
