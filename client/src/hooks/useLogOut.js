import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// Context
import { AuthContext } from "../context";

// Logs the current user out.
export default function useLogOut(username, email, password) {
    const { user } = useContext(AuthContext);
    let navigate = useNavigate();

    async function logOut() {
        console.log("Logging out...");

        // Disable auto login 
        localStorage.clear();
        
        // Go back to log in page.
        navigate("/");
    }

    return { logOut };
}