import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// Context
import { AuthContext } from "../context";

// Signs users up for a new account.
export default function useSignUp(username, email, password) {
    const { setUser } = useContext(AuthContext);
    let navigate = useNavigate();

    async function signUp(e) {
        e.preventDefault();
        console.log("New user signing up...");

        if(username && email && password){
            const registeringUser = await fetch(`${process.env.REACT_APP_SERVER_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            })
            const registeredUser = await registeringUser.json();

            // Check if signed up successfully
            if(registeredUser.error){
                alert(registeredUser.error);
            }
            else{
                alert("Signed Up successfully.");
                console.log(registeredUser);

                // Update global user state.
                setUser(registeredUser.user);
                console.log(registeredUser);

                // Set token to localstorage
                localStorage.clear();
                localStorage.setItem("userToken", registeredUser.token);
                localStorage.setItem("id", registeredUser.user._id);

                // Go back to ititial page and check if user is signed in
                navigate("/home", { replace: true });
            }
        }
        else{
            alert("Please enter some data.");
        }
    }

    return { signUp };
}