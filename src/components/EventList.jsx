import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookTicketAsync, fetchEvents, setCategory, setSearchQuery } from "../store/userEventSlice";
import { useEffect, useState } from "react";

const EventList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userEvent.currentUser);
  const { events, selectedCategory, searchQuery, loading, error } = useSelector((state) => state.userEvent); // Access state correctly
  const [bookingError, setBookingError] = useState("");  // Local state for booking errors

  const categories = ['Music', 'Art', 'Tech', 'Food', 'Comedy', 'Health', 'Movies', 'Literature'];

  // Handle search input change
  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  // Fetch events when component mounts
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Handle category filter change
  const handleCategoryChange = (event) => {
    dispatch(setCategory(event.target.value));
  };

  // Filter events by category
  const filteredEvents = selectedCategory
    ? events.filter((event) => event.category === selectedCategory)
    : events;

  // Filter events by search query
  const searchedEvents = filteredEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle ticket booking
  const handleBookTicket = (eventId) => {
    if (!currentUser) {
      // If the user is not logged in, redirect to the login page
      setBookingError("You need to be logged in to book a ticket.");
      navigate("/login");  // Redirect to login page
      return;
    }

    // Dispatch the action to book a ticket if logged in
    dispatch(bookTicketAsync({ eventId }));

    // Handle any errors after the dispatch
    if (error) {
      setBookingError("Failed to book the ticket. Please try again.");
    } else {
      // Proceed to the event detail page on success
      const selectedEvent = events.find((event) => event.id === eventId);
      navigate(`/event/${eventId}`, { state: { event: selectedEvent } });
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Events</h1>
      <div>
        <div className="mb-3">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Search by Title:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search events"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
          />

          <label className="block text-lg font-semibold text-gray-700 mb-2">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {bookingError && <p className="text-red-500">{bookingError}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{event.title}</h2>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-gray-500 mt-2">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-800 mt-2 font-semibold">₹{event.price}</p>
              <p className="text-sm text-gray-600">Available Seats: {event.availableSeats}</p>


            {
                currentUser? 
                <button
                onClick={() => handleBookTicket(event.id)}
                className="mt-4 w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Book Ticket
              </button>
              :<button
              onClick={() => handleBookTicket(event.id)}
              className="mt-4 w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Login to Book Ticket
            </button>
            }


            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
