import { useState } from "react";

// Fetches all the current user's data.
export default function useFetchProfile(_id) {
    const [user, setUser] = useState([]);

    async function fetchProfile(){
        console.log("fetching profile");
        const fetchedData = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "bearerHeader " + localStorage.getItem("userToken"), 
            },
            body: JSON.stringify({ _id })
        })
        setUser(await fetchedData.json());
        console.log("Fetching all users");
    }
    
    return { user, fetchProfile };
}