import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <nav className="bg-green-900 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-semibold text-2xl">
          <Link to="/">MyApp</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          <Link to="/events" className="text-white hover:text-gray-300">Events</Link>
          <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
