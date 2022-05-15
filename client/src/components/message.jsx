import { useContext } from "react";
import "../styles/message.css";

// Context
import { AuthContext } from "../context";


export default function Message({ sender_id , receiverUsername, message, createdAt }) {
    const { user:{_id: userId} } = useContext(AuthContext);

    return  (
        <div className={sender_id === userId? "message own": "message default"}>
            <div className={sender_id === userId? "own-top" : "default-top"}>
                <h3>{sender_id === userId? "Me" : receiverUsername}</h3>
                <p>{String(createdAt).slice(11, 16)}</p>
            </div>
            <div className={sender_id === userId? "own-bottom" : "default-bottom"}>
                <p>{message}</p>
            </div>
        </div>
    )        
}
