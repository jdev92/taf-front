import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./pages/createUser";
import Login from "./pages/login";
import Home from "./pages/home";
import Users from "./pages/users";
import Update from "./pages/update";
import Calendar from "./pages/calendar";
import UserDetails from "./pages/userDetails";
import AllEvents from "./pages/allEvents";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/userdetails/:userId" element={<UserDetails />} />
          <Route path="/allEvents" element={<AllEvents />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
