import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// Context
import { AuthContext } from "../context";

// Signs users in if they already have an account.
export default function useAdminSignIn(email, password) {
    const { setUser } = useContext(AuthContext);
    let navigate = useNavigate();
    
    async function adminSignIn(e) {
        e.preventDefault();
        console.log("Signing in...");

        if(email && password){
            const signingInUser = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "bearerHeader " + localStorage.getItem("userToken"), 
                },
                body: JSON.stringify({email, password})
            })
            const signedInUser = await signingInUser.json();
            
            // If error
            if(signedInUser.error){
                alert(signedInUser.error);
                return;
            }
            else{
                // Update user in global state.
                console.log("Signed in");
                alert("Signed in successfully.")
                setUser(signedInUser.user);
                
                // Set token to localstorage
                localStorage.setItem("userToken", signedInUser.token);
                localStorage.setItem("id", signedInUser.user._id);
                
                // Go to home page
                navigate("/dashboard");
            }
        }
        else{
            alert("Please enter some data");
        }
    }

    return { adminSignIn };
}