import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userEventSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, events, error } = useSelector((state) => state.userEvent);
  
    const bookedEvents = currentUser?.bookedTickets?.map((eventId) =>
      events.find((event) => event.id === eventId)
    ).filter(event => event !== undefined); // Filter out any null values
  
    const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
    };
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Profile</h1>
        {currentUser ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Hello, {currentUser.username}</h2>
            <h3 className="text-xl font-semibold mb-4">Your Bookings:</h3>
            {bookedEvents && bookedEvents.length > 0 ? (
              <ul className="space-y-4">
                {bookedEvents.map((event) => (
                  <li key={event.id} className="p-4 border rounded-md shadow-md bg-gray-50">
                    <h4 className="text-lg font-bold">{event.title}</h4>
                    <p className="text-gray-700">Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-gray-700">Location: {event.location}</p>
                    <p className="text-gray-700">Price: ₹{event.price}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">You have no bookings yet.</p>
            )}
            <button
              onClick={handleLogout}
              className="mt-6 w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        ) : (
          <p className="text-center text-red-500">You need to be logged in to view your profile.</p>
        )}
      </div>
    );
  };
  
  export default Profile;