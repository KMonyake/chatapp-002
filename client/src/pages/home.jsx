import { useState, useEffect, useContext } from "react";
import "../styles/home.css";

// Hooks
import useFetchUsers from "../hooks/useFetchUsers";
import useFetchMessages from "../hooks/useFetchMessages";
import useSendMessage from "../hooks/useSendMessage";

// Context
import { AuthContext } from "../context";

// Components
import User from "../components/user";
import Message from "../components/message";


export default function Home() {
    const { user: { _id: userId } } = useContext(AuthContext);

    const [text, setText] = useState("");
    const [chatId, setChatId] = useState(localStorage.getItem("recentChatId"));
    const [receiverId, setReceiverId] = useState(localStorage.getItem("recentReceiverId"));
    const [receiverUsername, setReceiverUsername] = useState(localStorage.getItem("recentReceiverUsername"));

    // Fetch all users as soon as page loads.
    const { users, fetchUsers } = useFetchUsers(userId);
    useEffect(() => {
        fetchUsers();
    },[])
    
    // Fetch all messages as soon as recepient changes.
    const { messages, fetchMessages } = useFetchMessages(chatId);
    useEffect(() => {
        fetchMessages();
    },[chatId])

    // Send a message 
    const { sendMessage } = useSendMessage(chatId, userId, receiverId, text);

    return  (
        <div className="home-container">
            <div className="users-container">
                <h2>contacts</h2>
                {
                    users.map(eachUser => {
                        return(
                            <User 
                                key={eachUser._id} 
                                {...eachUser} 
                                setReceiverId={setReceiverId}
                                setReceiverUsername={setReceiverUsername}
                                setChatId={setChatId}
                            />
                        ) 
                    })
                }
            </div>
            <div className="messages-container">
                <header className="start">
                    <h2>{receiverUsername? receiverUsername: "Choose someone to talk to"}</h2>
                </header>
                <div className="middle">
                    {
                        messages.map(eachMessage => {
                            return(
                                <Message 
                                    key={eachMessage._id} 
                                    {...eachMessage}
                                    receiverUsername={receiverUsername}
                                />
                            )
                        })
                    }
                    {!messages && <h3 className="no-convo">There are no messages.</h3>}
                </div>
                {
                    chatId &&
                        <form className="bottom" onSubmit={sendMessage}>
                            <input
                                type="text"
                                placeholder="enter message"
                                onInput={(e) => setText(e.target.value)}
                            />
                            <button className="btn">send</button>
                        </form>
                }
            </div>
        </div>
    )
}