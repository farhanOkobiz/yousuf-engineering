/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BradCumbs from "../components/shared/BradCumbs";
import Containar from "../components/containar/Containar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api from "../components/axios/Axios";
import { PhotoView } from "react-photo-view";

const Clients = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await api.get(`/partners`);
      return response.data.data?.doc || []; // Adjust based on your actual response structure
    } catch (error) {
      console.error("Error fetching events:", error);
      return []; // Handle errors gracefully
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const res = await fetchEvents();
      setEvents(res);
      setLoading(false);
    };

    loadEvents();
  }, []);

  return (
    <div className="font-robo">
      {/* Top Section */}
      <div className="h-[64px] sm:h-[83.4px] bg-[#f5f5f5]"></div>
      <BradCumbs title="Our Clients" brad="Clients" />
      <div className="py-[60px] sm:py-[100px]">
        <Containar>
          <div className="lg:p-0">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index}>
                    <Skeleton height={150} className="w-full rounded-lg" />
                    <div className="mt-2 text-center">
                      <Skeleton width={100} />
                    </div>
                  </div>
                ))}
              </div>
            ) : events?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12">
                {events.map((event) => (
                  <div key={event.id} className="border-2 border-gray-300 p-1 rounded-lg">
                    <div className="h-[150px] w-full relative">
                      <PhotoView key={event.id} src={event?.photo}>
                        <img
                          className="w-full h-full object-contain rounded-lg"
                          src={event?.photo || "https://via.placeholder.com/150"}
                          alt={event?.heading || "Client Image"}
                        />
                      </PhotoView>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="h-32 flex items-center justify-center text-2xl font-semibold text-primary">
                No Clients Available!
              </p>
            )}
          </div>
        </Containar>
      </div>
    </div>
  );
};

export default Clients;
