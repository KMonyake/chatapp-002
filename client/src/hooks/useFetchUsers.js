import { useState } from "react";

// Fetches all available contacts on the app.
export default function useFetchUsers(userId) {
    const [users, setUsers] = useState([]);

    async function fetchUsers(){
        const fetchedData = await fetch(`${process.env.REACT_APP_SERVER_URL}/allusers`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "bearerHeader " + localStorage.getItem("userToken"), 
            },
            body: JSON.stringify({ userId })
        })
        setUsers(await fetchedData.json());
        console.log("Fetching all users");
    }
    
    return { users, fetchUsers };
}