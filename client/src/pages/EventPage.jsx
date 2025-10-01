/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BradCumbs from "../components/shared/BradCumbs";
import Containar from "../components/containar/Containar";
import { Link } from "react-router-dom";
import event1 from "../assets/event/event1.jpg";
import event2 from "../assets/event/event2.jpg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Use FaChevronRight for the next button
import api from "../components/axios/Axios";
import { PhotoView } from "react-photo-view";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // Number of events per page
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async (page, limit) => {
    try {
      const response = await api.get(`/events?limit=${limit}&page=${page}`);
      return {
        data: response.data.data, // Adjust based on your actual response structure
        total: response.data.totalData, // Total events available in the database
      };
    } catch (error) {
      console.error("Error fetching events:", error);
      return { data: [], total: 0 }; // Handle errors gracefully
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const res = await fetchEvents(page, limit);
      setEvents(res?.data?.doc);
      setTotalEvents(res.total);
      setLoading(false);
    };

    loadEvents();
  }, [page, limit]);

  // Calculate total pages
  const totalPages = Math.ceil(totalEvents / limit);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    return {
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }), // e.g., "02:30 PM"
      date: `${date.getDate()} ${date.toLocaleString("en-US", {
        month: "long",
      })} ${date.getFullYear()}`, // e.g., "30 September 2024"
    };
  };

  return (
    <div className="font-robo">
      {/* Top Section */}
      <div className="h-[64px] sm:h-[83.4px] bg-[#f5f5f5]"></div>
      <BradCumbs title="Our Gallery" brad="Gallery" />
      <div className="py-[60px] sm:py-[100px]">
        <Containar>
          <div className=" lg:p-0">
            {/* {events} */}
            {loading ? (
              <div>
                <Skeleton height={480} />
              </div>
            ) : (
              <>
                {/* Images Section */}
                {events?.length > 0 && events.some((e) => e.photo) && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                      Images
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {events
                        .filter((e) => e.photo)
                        .map((event) => (
                          <div key={event._id}>
                            <div className="h-[200px] lg:h-[350px] w-full relative">
                              <PhotoView src={event.photo}>
                                <img
                                  className="w-full h-full object-cover rounded-2xl"
                                  src={event.photo}
                                  alt={event.heading}
                                />
                              </PhotoView>
                            </div>
                            <div className="mt-4 text-center text-lg font-medium line-clamp-2">
                              {event.heading !== "undefined"
                                ? event.heading
                                : ""}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Videos Section */}
                {events?.length > 0 &&
                  events.some(
                    (e) => e.youtubeVideo && e.youtubeVideo !== "undefined"
                  ) && (
                    <div className="mt-12">
                      <h2 className="text-2xl font-semibold mb-6 text-center">
                        Videos
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events
                          .filter(
                            (e) =>
                              e.youtubeVideo &&
                              e.youtubeVideo !== "undefined" &&
                              e.youtubeVideo.includes("youtu")
                          )
                          .map((event) => {
                            let videoId = "";
                            if (event.youtubeVideo.includes("youtu.be")) {
                              videoId = event.youtubeVideo
                                .split("youtu.be/")[1]
                                .split("?")[0];
                            } else if (
                              event.youtubeVideo.includes("watch?v=")
                            ) {
                              videoId = event.youtubeVideo
                                .split("watch?v=")[1]
                                .split("&")[0];
                            }
                            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

                            return (
                              <div key={event._id}>
                                <div className="h-[200px] lg:h-[350px] w-full relative rounded-2xl overflow-hidden">
                                  <iframe
                                    width="100%"
                                    height="100%"
                                    src={embedUrl}
                                    title={event.heading}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-2xl"
                                  />
                                </div>
                                <div className="mt-4 text-center text-lg font-medium line-clamp-2">
                                  {event.heading !== "undefined"
                                    ? event.heading
                                    : ""}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
              </>
            )}
          </div>
        </Containar>
      </div>
    </div>
  );
};

export default EventPage;
