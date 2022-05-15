import { useState, useEffect } from "react";
import "../styles/admin.css";

// Hooks
import useAutoSignIn from "../hooks/useAutoSignIn";
import useAdminSignIn from "../hooks/useAdminSignIn";


export default function Admin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Sign in
    const { adminSignIn } = useAdminSignIn(email, password);

    //Auto sign in
    const { autoSignIn } = useAutoSignIn(localStorage.getItem("id"));
    useEffect(() => {
        if (localStorage.getItem("id")){
            autoSignIn();
        }
    },[])

    return (
        <div className="admin">
            <form className="form" onSubmit={adminSignIn}>
                <h2>admin login</h2>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        placeholder="admin@gmail.com"
                        onInput={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        id="password" 
                        placeholder="admin1"
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