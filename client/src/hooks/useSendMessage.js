
// Sends messages to receiving contact.
export default function useSendMessage(chatId, senderId, receiverId, text) {
    async function sendMessage() {
        if(text){
            fetch(`${process.env.REACT_APP_SERVER_URL}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatId, senderId, receiverId, text })
            })
            .then(() => console.log("Message sent"))
            .catch(() => console.log("Error sending a new message to the back-end."))
        }
    }
    
    return { sendMessage };
}