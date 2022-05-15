import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

// Hooks
import useLogOut from "../hooks/useLogOut"; 

// This is the navbar component seen on the top of every page
export default function Navbar() {
    const { logOut } = useLogOut();
    const navigate = useNavigate();
    
    if(window.location.pathname === "/"){
        return (
            <nav className="navbar">
                <h2>messenger</h2>
                <Link to="/admin">admin access</Link>
                <Link to="/register">sign up</Link>
            </nav>
        )
    }
    
    if(window.location.pathname === "/register"){
        return (
            <nav className="navbar">
                <h2 id="logo" onClick={() => navigate("/home")}>messenger</h2>
                <Link to="/" className="btn">login</Link>
            </nav>
        )
    }

    if(window.location.pathname === "/admin"){
        return (
            <nav className="navbar-red">
                <Link to="/"><h2>messenger</h2></Link>
            </nav>
        )
    }

    if(window.location.pathname === "/home"){
        return (
            <nav className="navbar">
                <h2>messenger</h2>
                <Link to="/profile" className="btn">profile</Link>
            </nav>
        )
    }

    if(window.location.pathname === "/profile"){
        return (
            <nav className="navbar">
                <h2 id="logo" onClick={() => navigate("/home")}>messenger</h2>
                <button onClick={logOut}>log out</button>
            </nav>
        )
    }
    
    if (window.location.pathname === "/dashboard") {
        return (
            <nav className="navbar-red">
                <h2>admin</h2>
                <button onClick={logOut}>log out</button>
            </nav>
        )
    }
}
