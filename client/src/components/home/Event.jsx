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
              <Skeleton height={200} />
            ) : (
              <>
                {events?.doc?.length > 0 ? (
                  <>
                    {/* Images Row */}
                    {events?.doc.some((item) => item.photo) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 md:gap-y-8 gap-x-8 mt-8">
                        {events?.doc
                          .filter((item) => item.photo) // শুধু images
                          .slice(0, 8)
                          .map((item) => (
                            <PhotoView key={item._id} src={item.photo}>
                              <img
                                src={item.photo}
                                alt={item.heading}
                                className="w-full md:w-80 h-48 object-cover rounded-lg"
                              />
                            </PhotoView>
                          ))}
                      </div>
                    )}

                    {/* Videos Row */}
                    {events?.doc.some(
                      (item) =>
                        item.youtubeVideo && item.youtubeVideo !== "undefined"
                    ) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 md:gap-y-8 gap-x-8 mt-8">
                        {events?.doc
                          .filter(
                            (item) =>
                              item.youtubeVideo &&
                              item.youtubeVideo !== "undefined" &&
                              item.youtubeVideo.includes("youtu")
                          )
                          .slice(0, 8)
                          .map((item) => {
                            let videoId = "";
                            if (item.youtubeVideo.includes("youtu.be")) {
                              videoId = item.youtubeVideo
                                .split("youtu.be/")[1]
                                .split("?")[0];
                            } else if (item.youtubeVideo.includes("watch?v=")) {
                              videoId = item.youtubeVideo
                                .split("watch?v=")[1]
                                .split("&")[0];
                            }
                            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

                            return (
                              <div
                                key={item._id}
                                className="relative w-full md:w-80 h-48 rounded-lg overflow-hidden"
                              >
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={embedUrl}
                                  title={item.heading}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="rounded-lg"
                                />
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="h-32 flex items-center text-2xl font-semibold text-primary">
                    No media available!
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
