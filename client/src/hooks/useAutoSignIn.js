import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// Context
import { AuthContext } from "../context";

// Automatically signs in the user as page refreshes will kick users out due to heavy app security.
export default function useSignIn(id) {
    const { user, setUser } = useContext(AuthContext);
    let navigate = useNavigate();

    async function autoSignIn() {
        console.log("Auto signing in...");

        const signingInUser = await fetch(`${process.env.REACT_APP_SERVER_URL}/autosignin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({_id: id})
        })
        const signedInUser = await signingInUser.json();
        
        // Update user in global state.
        console.log("Signed in successfully.");
        setUser(signedInUser);

        // In case of refresh go home unless its the admin
        if (localStorage.getItem("id") === "6280123d43f8438c91d3c5ca"){
            navigate("/dashboard");
        }
        else{
            navigate("/home");
        }
    }

    return { autoSignIn };
}