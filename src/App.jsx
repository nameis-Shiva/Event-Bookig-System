import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import About from "./components/About";

function App() {
  return (
    <AuthProvider>
     <div>
     <Router>
    <Navbar/>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
     </div>
    </AuthProvider>
  );
}

export default App;
