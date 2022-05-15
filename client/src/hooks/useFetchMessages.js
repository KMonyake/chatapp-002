import { useState } from "react";

// Fetches all messages shared between contacts.
export default function useFetchMessages(chatId) {
    const [messages, setMessages] = useState([]);

    async function fetchMessages() {
        const fetchedData = await fetch(`${process.env.REACT_APP_SERVER_URL}/allmessages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatId })
        })
        setMessages(await fetchedData.json());
        console.log("Fetching all messages");
    }

    return { messages, fetchMessages };
}