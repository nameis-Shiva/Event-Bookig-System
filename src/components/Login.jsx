import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userEventSlice";
import userData from "../user.json"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get error from Redux state
  const reduxError = useSelector((state) => state.userEvent.error);

  // Function to handle login
  const handleLogin = () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    // Verify user credentials
    const user = userData.find((user) => user.username === username && user.password === password);

    // Dispatch the login action to handle user authentication
    if(user){
        dispatch(login({ username, password }));
        navigate("/")
        setError("");
    } else {
        setError("Invalid Username or Password")
    }

    // If there is an error from Redux, update the component's error state
    if (reduxError) {
      setError(reduxError);
    } 

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
        >
          Login
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
