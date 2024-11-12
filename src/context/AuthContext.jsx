import React, { createContext, useState, useContext } from "react";

// Create the context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user data from localStorage if available
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username, password) => {
    // Replace with your actual login logic (e.g., API call)
    if (username === "user" && password === "pass") {
      const newUser = { username, bookedTickets: [] }; // Add bookedTickets to the user
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser)); // Save to localStorage
    } else {
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
