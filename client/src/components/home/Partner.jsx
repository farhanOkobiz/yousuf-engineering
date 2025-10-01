import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Containar from "../containar/Containar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Marquee from "react-fast-marquee"; // Import react-fast-marquee
import api from "../axios/Axios";

const Partner = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPartners = async () => {
    try {
      const response = await api.get(`/partners`);
      setPartners(response.data?.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartners();
  }, []);

  return (
    <>
      <Containar>
      <div className="font-robo">
        {loading ? (
          <div>
            <Skeleton height={200} />
          </div>
        ) : (
          <>
            {partners?.doc?.length > 0 ? (
              <div className="pt-5">
                <Containar>
                  <h2 className="text-[22px] sm:text-[36px] font-semibold leading-8 sm:leading-[48px] mt-16 text-primary">
                    Trusted Client of Qutex
                  </h2>
                </Containar>

                <div className="my-8">
                  {/* Add react-fast-marquee */}
                  <Marquee gradient={false} speed={50} pauseOnHover={true}>
                    {partners?.doc?.map((item, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-28 h-28 md:w-40 md:h-40 bg-white shadow-lg flex justify-center items-center mx-5 overflow-hidden p-1 border-2 border-gray-200"
                      >
                        <Link className="w-full h-full" to={"/"}>
                          <img
                            className="w-full h-full object-contain"
                            src={item?.photo}
                            alt={`Partner logo ${index + 1}`}
                          />
                        </Link>
                      </div>
                    ))}
                  </Marquee>
                </div>

                <div className="my-10 text-center">
                  <Link
                    to="/clients"
                    className="w-28 mx-auto px-6 py-3 text-lg font-medium text-white bg-primary rounded-full hover:transform hover:scale-110 transition-all ease-linear duration-200"
                  >
                    See all clients
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No partners found. Please try again later.
              </p>
            )}
          </>
        )}
      </div>
      </Containar>
    </>
  );
};

export default Partner;
