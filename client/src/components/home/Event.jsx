import React, { useEffect, useState } from "react";
import { PhotoView } from "react-photo-view";
import Containar from "../containar/Containar";
import { Link } from "react-router-dom";
import event1 from "../../assets/event/event1.jpg";
import event2 from "../../assets/event/event2.jpg";
import { MdOutlineWatchLater } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";
import api from "../axios/Axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [singleEvent, setSingleEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEvents = async () => {
    try {
      const response = await api.get(`/events`);
      // console.log(`response`, response);

      setEvents(response.data?.data);
      if (response.data?.data?.doc?.length > 0) {
        getSingleEvent(response.data?.data?.doc[0]._id); // Get the first event
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch a single event by ID
  const getSingleEvent = async (id) => {
    try {
      const response = await api.get(`/events/${id}`);
      // console.log(`Single Event response`, response);
      setSingleEvent(response.data?.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    return `
    ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}, 
    ${date.getDate()} ${date.toLocaleString("en-US", {
      month: "short",
    })}, ${date.getFullYear()}`;
  };

  return (
    <div className="font-robo mt-8">
      <Containar>
        <div className="sticky top-10">
          <div>
            <h4 className="text-[22px] sm:text-[36px] font-semibold leading-8 sm:leading-[48px] mt-2.5 text-primary">
              Our Gallery
            </h4>
          </div>

          <div>
            {loading ? (
              <div>
                <Skeleton height={200} />
              </div>
            ) : (
              <>
                {events?.doc?.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 md:gap-y-8 gap-x-8 mt-8">
                      {events?.doc.slice(0, 8).map(
                        (
                          image // Limit to 4 images
                        ) => (
                          <PhotoView key={image.id} src={image?.photo}>
                            <img
                              src={image?.photo}
                              alt="company gallery photo"
                              className="w-full md:w-80 h-48 object-cover rounded-lg"
                            />
                          </PhotoView>
                        )
                      )}
                    </div>
                    <div className="mt-8 text-center">
                      <Link
                        to="/gallery"
                        className="w-28 mx-auto px-6 py-3 text-lg font-medium text-white bg-primary rounded-full hover:transform hover:scale-110 transition-all ease-linear duration-200"
                      >
                        See full gallery
                      </Link>
                    </div>
                  </>
                ) : (
                  <p className="h-32 flex items-center text-2xl font-semibold text-primary">
                    No images available!
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

export default Event;
