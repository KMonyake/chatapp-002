import { useContext } from "react";
import "../styles/user.css";

// Context 
import { AuthContext } from "../context";


// This component is the user contact seen on the left in the home page
export default function User({ _id, username, setReceiverUsername, setReceiverId, setChatId }) {
    const { user: { _id: userId } } = useContext(AuthContext);
    
    function handleChatId(){
        // This is the username of the person we are talking to
        setReceiverUsername(username); 
        localStorage.setItem("recentReceiverUsername", username);
        
        // This is the user id of the person we are talking to
        setReceiverId(_id); 
        localStorage.setItem("recentReceiverId", _id);
        
        // Ensure chat id is always the same between the same people
        if(userId > _id) {
            setChatId(userId + _id);
            // Always remember the last receiver for auto login
            localStorage.setItem("recentChatId", userId + _id);
        }
        else {
            setChatId(_id + userId);
            // Always remember the last chat for auto login
            localStorage.setItem("recentChatId", _id + userId);
        }
    }

    return  (
        <article onClick={handleChatId} className="contact"> 
            <h3>{username}</h3>
        </article>
    )
}