import { useState, useEffect } from "react";
import "../styles/profile.css";

// Hooks
import useFetchProfile from "../hooks/useFetchProfile";
import useUpdateProfile from "../hooks/useUpdateProfile";
import useDeleteAccount from "../hooks/useDeleteAccount";


export default function Profile() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const { user, fetchProfile } = useFetchProfile(localStorage.getItem("id"));
    // Fetch user profile on page load.
    useEffect(() => {
        console.log("fetching user profile.");
        fetchProfile();   
    },[])
    
    // Update state when the profile data is available.
    useEffect(()=>{
        setEmail(user.email);
        setPassword(user.password);
        setUsername(user.username);
    },[user])

    const { updateProfile } = useUpdateProfile(localStorage.getItem("id"), email, password, username);
    const { deleteAccount } = useDeleteAccount();

    return (
        <div className="profile-container">
            <div className="card-container">
                <div className="card">
                    <h2>Logged in as</h2>
                    <h2><span>username:</span>{user.username}</h2>
                    <h2><span>email:</span>{user.email}</h2>
                    <h2><span>joined on:</span>{String(user.createdAt).slice(0, 10)}</h2>
                </div>
            </div>
            <form onSubmit={updateProfile}>
                <label htmlFor="email">update email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onInput={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">update password</label>
                <input
                    type="text"
                    id="password"
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="username">update username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onInput={(e) => setUsername(e.target.value)}
                />
                <div className="button-container">
                    <button type="submit">submit</button>
                </div>
            </form>
            <div className="delete-section">
                <button onClick={() => deleteAccount(localStorage.getItem("id"))}>delete account</button>
            </div>
        </div>
    )
}