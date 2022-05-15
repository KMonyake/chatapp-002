import { useState, useEffect } from "react";
import "../styles/login.css";

// Hooks
import useAutoSignIn from "../hooks/useAutoSignIn";
import useSignIn from "../hooks/useSignIn";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Sign in
    const { signIn } = useSignIn(email, password);

    //Auto sign in
    const { autoSignIn } = useAutoSignIn(localStorage.getItem("id"));
    useEffect(() => {
        if (localStorage.getItem("id")){
            autoSignIn();
        }
    },[])

    return (
        <div className="login-container">
            <form onSubmit={signIn}>
                <h2>login</h2>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        onInput={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        id="password" 
                        onInput={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="button-container">
                    <button>login</button>
                </div>
            </form>
        </div>
    )
}