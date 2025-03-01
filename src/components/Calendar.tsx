import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { baseUrl } from "src/core/static/static";

import PopUp from "./pop-up";
interface CalendarComponentProps {
  isGround: boolean;
}
interface Booking {
  _id: string;
  name: string;
  company: string;
  email: string;
  isAccepted: boolean;
  startTime: string;
  endTime: string;
  meetingRoom: string;
  isGround: boolean;
  program: string;
  __v: number;
}
export default function CalendarComponent(props: CalendarComponentProps) {
  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [events, setEvents] = useState<Booking[]>([]);

  const colors = ["bg-yallowGarage", "bg-blueGarage", "bg-pinkGarage"];

  const getRandomColorClass = (): string => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/get-all-booking`);
      setEvents(response.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getBookingById = async (bookingId: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/get-booking-by-id/${bookingId}`
      );
      setSelectedBooking(response.data);
      setShowPopUp(true);
    } catch (error) {
      console.error("Error fetching booking by ID:", error);
    }
  };

  const updateBookById = async (id: string, isAccepted: boolean) => {
    try {
      // Optimistic Update: Update local state immediately
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === id ? { ...event, isAccepted: isAccepted } : event
        )
      );

      // Send the update to the server
      await axios.put(`${baseUrl}/accetp-booking/${id}`, { isAccepted });

      // Refetch data to reconcile with the server
      await fetchData();
    } catch (error: any) {
      console.error("Error updating booking:", error);
      // Revert the local state if the server update fails (optional)
      fetchData(); //Revert to server state
    }
  };

  const closePopup = () => {
    setShowPopUp(false);
    setSelectedBooking(null);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="relative py-8 sm:p-8 p-2 bg-white rounded-md">
          {props.isGround ? (
            <div className="border w-full h-full border-gray-200 grid grid-cols-9 divide-gray-200 border-b ">
              {events
                .filter((event) => event.isGround)
                .map((event) => (
                  <div key={event._id}> {/* Use event._id as key */}
                    <div className="p-3.5 flex flex-col sm:flex-row items-center justify-between border-r border-gray-200">
                      <span className="text-sm font-medium text-gray-500">
                        <div
                          className="mx-2 my-2 cursor-pointer"
                          onClick={() => getBookingById(event._id)}
                        >
                          <span
                            className={`hidden lg:block text-xs font-medium ${getRandomColorClass()} py-2 px-2 size-full text-center rounded-md text-gray-500`}
                          >
                            <p>Meeting Room Number: {event.meetingRoom}</p>
                            <p>Start Time: {event.startTime}</p>
                            <p>End Time: {event.endTime}</p>
                            <p>Company: {event.company}</p>
                            {!event.isAccepted && (
                              <div className="grid space-between cursor-pointer grid-cols-2 justify-center">
                                <MdCancel
                                  onClick={() =>
                                    updateBookById(event._id, false)
                                  }
                                  className="w-full my-1 text-3xl cursor-pointer text-red-500 "
                                />
                                <FaCheck
                                  onClick={() =>
                                    updateBookById(event._id, true)
                                  }
                                  className="w-full my-1 text-3xl text-teal-900 cursor-pointer"
                                />
                              </div>
                            )}
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="border w-full h-full grid grid-cols-5 divide-gray-200 border-b border-gray-200">
              {events
                .filter((event) => !event.isGround)
                .map((event) => (
                  <div key={event._id}> {/* Use event._id as key */}
                    <div className="p-3.5 flex flex-col sm:flex-row items-center justify-between border-r border-gray-200">
                      <span className="text-sm font-medium text-gray-500">
                        <div
                          className="mx-2 my-2 cursor-pointer"
                          onClick={() => getBookingById(event._id)}
                        >
                          <span
                            className={`hidden lg:block text-xs font-medium ${getRandomColorClass()} py-2 px-2 size-full text-center rounded-md text-gray-500`}
                          >
                            <p>Meeting Room Number: {event.meetingRoom}</p>
                            <p>Start Time: {event.startTime}</p>
                            <p>End Time: {event.endTime}</p>
                            <p>Company: {event.company}</p>
                            {!event.isAccepted && (
                              <div className="grid space-between grid-cols-2 justify-center">
                                <MdCancel
                                  onClick={() =>
                                    updateBookById(event._id, false)
                                  }
                                  className="w-full my-1 text-3xl text-red-500 cursor-pointer"
                                />
                                <FaCheck
                                  onClick={() =>
                                    updateBookById(event._id, true)
                                  }
                                  className="w-full my-1 text-3xl text-teal-900 cursor-pointer"
                                />
                              </div>
                            )}
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      )}

      {showPopUp && selectedBooking && (
        <PopUp
          event={selectedBooking}
          showpopUp={showPopUp}
          onClose={closePopup}
        />
      )}
    </>
  );
}