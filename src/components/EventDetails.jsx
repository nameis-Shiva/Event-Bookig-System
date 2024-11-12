import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookTicketAsync } from "../store/userEventSlice";

const EventDetails = () => {
  const { state } = useLocation();
  const event = state?.event;
  const dispatch = useDispatch();

  // State to manage booking status and errors
  const [isBooked, setIsBooked] = useState(false);
  const [bookingError, setBookingError] = useState("");

  if (!event) {
    return <p>Event not found!</p>;
  }

  const handleBookTicket = () => {
    // Dispatch the async booking action
    dispatch(bookTicketAsync(event.id))
      .then(() => {
        setIsBooked(true);
        setBookingError(""); // Clear any errors
      })
      .catch((error) => {
        setBookingError(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">Event Details</h2>

        <div className="mb-4">
          <p className="text-xl font-semibold text-gray-700 mb-2">Title:</p>
          <p className="text-2xl font-medium text-gray-800">{event.title}</p>
        </div>

        <div className="mb-4">
          <p className="text-xl font-semibold text-gray-700 mb-2">Description:</p>
          <p className="text-lg text-gray-600">{event.description}</p>
        </div>

        <div className="mb-6">
          <p className="text-xl font-semibold text-gray-700 mb-2">Date:</p>
          <p className="text-lg text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
        </div>

        {/* Display booking status */}
        {bookingError && <p className="text-red-500 font-semibold text-lg mt-4 text-center">{bookingError}</p>}
        {isBooked ? (
          <p className="text-green-500 font-semibold text-lg mt-4 text-center">Ticket Booked!</p>
        ) : (
          <button
            onClick={handleBookTicket}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 mt-4"
          >
            Book Ticket
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
