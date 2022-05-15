import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./pages/admin";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Dashboard from "./pages/dashboard";

// Components
import PrivateRoute from "./privateRoute";


export default function App() {
  return  <Router>              
            <Navbar/>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/home" element={<PrivateRoute children={<Home/>}/>}/>
              <Route path="/profile" element={<PrivateRoute children={<Profile/>}/>}/>
              <Route path="/dashboard" element={<PrivateRoute children={<Dashboard/>}/>}/>
            </Routes>
          </Router>
}

