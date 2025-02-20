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
  const [showPopUp, setShowPopUp] = useState(false); // Initialize as false
  const [selectedBooking, setSelectedBooking] = useState<Booking | any>(null); // Store the selected booking
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
      //
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
        `${baseUrl}/get-booking-by-id/${bookingId}`,
      );
      setSelectedBooking(response.data); // Set the selected booking data
      setShowPopUp(true); // Open the popup after fetching data
    } catch (error) {
      //
    }
  };

  const updateBookById = async (id: string, isAccepted: boolean) => {
    setLoading(true);
    try {
      await axios.put(`${baseUrl}/accetp-booking/${id}`, { isAccepted });
      fetchData(); // Refresh the booking list after update
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        //
      } else {
        //
      }
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopUp(false);
    setSelectedBooking(null); // Clear selected booking when closing the popup
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
                .map(
                  (
                    event,
                    i, // Use filter for cleaner code
                  ) => (
                    <div key={i}>
                      <div className="p-3.5 flex flex-col sm:flex-row items-center justify-between border-r border-gray-200">
                        <span className="text-sm font-medium text-gray-500">
                          <div
                            className="mx-2 my-2 cursor-pointer" // Make the div clickable
                            onClick={() => getBookingById(event._id)}
                          >
                            <span
                              className={`hidden lg:block text-xs font-medium ${getRandomColorClass()} py-2 px-2 size-full text-center rounded-md text-gray-500`}
                            >
                              <p>Meeting Room Number: {event.meetingRoom}</p>
                              <p>Start Time: {event.startTime}</p>
                              <p>End Time: {event.endTime}</p>
                              <p>Company: {event.company}</p>
                              {!event.isAccepted && ( // Conditionally render buttons
                                <div className="grid space-between cursor-pointer grid-cols-2 justify-center">
                                  <MdCancel
                                    onClick={() =>
                                      updateBookById(event._id, false)
                                    } // Pass false for rejection
                                    className="w-full my-1 text-3xl cursor-pointer text-red-500 "
                                  />
                                  <FaCheck
                                    onClick={() =>
                                      updateBookById(event._id, true)
                                    } // Pass true for acceptance
                                    className="w-full my-1 text-3xl text-teal-900 cursor-pointer"
                                  />
                                </div>
                              )}
                            </span>
                          </div>
                        </span>
                      </div>
                    </div>
                  ),
                )}
            </div>
          ) : (
            <div className="border w-full h-full grid grid-cols-5 divide-gray-200 border-b border-gray-200">
              {events
                .filter((event) => !event.isGround)
                .map(
                  (
                    event,
                    i, // Use filter for cleaner code
                  ) => (
                    <div key={i}>
                      <div className="p-3.5 flex flex-col sm:flex-row items-center justify-between border-r border-gray-200">
                        <span className="text-sm font-medium text-gray-500">
                          <div
                            className="mx-2 my-2 cursor-pointer" // Make the div clickable
                            onClick={() => getBookingById(event._id)}
                          >
                            <span
                              className={`hidden lg:block text-xs font-medium ${getRandomColorClass()} py-2 px-2 size-full text-center rounded-md text-gray-500`}
                            >
                              <p>Meeting Room Number: {event.meetingRoom}</p>
                              <p>Start Time: {event.startTime}</p>
                              <p>End Time: {event.endTime}</p>
                              <p>Company: {event.company}</p>
                              {!event.isAccepted && ( // Conditionally render buttons
                                <div className="grid space-between grid-cols-2 justify-center">
                                  <MdCancel
                                    onClick={() =>
                                      updateBookById(event._id, false)
                                    } // Pass false for rejection
                                    className="w-full my-1 text-3xl text-red-500 cursor-pointer"
                                  />
                                  <FaCheck
                                    onClick={() =>
                                      updateBookById(event._id, true)
                                    } // Pass true for acceptance
                                    className="w-full my-1 text-3xl text-teal-900 cursor-pointer"
                                  />
                                </div>
                              )}
                            </span>
                          </div>
                        </span>
                      </div>
                    </div>
                  ),
                )}
            </div>
          )}
        </section>
      )}

      {/* Render the popup conditionally */}
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
