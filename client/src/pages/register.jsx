import { useState } from "react";
import "../styles/register.css";

// Hooks
import useSignUp from "../hooks/useSignUp";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Sign Up
    const { signUp } = useSignUp(username,email,password);
    
    return  (
        <section className="register-container">
            <form onSubmit={signUp}>
                <h2>Create an account.</h2>
                <div className="input-container">
                    <label htmlFor="name">Username</label>
                    <input 
                        type="text" 
                        id="name" 
                        onInput={(e) => setUsername(e.target.value)}
                    />
                </div>
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
                    <button>register</button>
                </div>
            </form>
        </section>
    )
}
