import { useEffect } from "react";
import "../styles/dashboard.css";

// Hooks
import useFetchUsers from "../hooks/useFetchUsers";
import useDeleteAccount from "../hooks/useDeleteAccount";


export default function Dashboard() {
    // Fetch all users as soon as page loads.
    const { users, fetchUsers } = useFetchUsers();
    useEffect(() => {
        fetchUsers();
    },[])

    const { deleteAccount } = useDeleteAccount();

    function findUserId(e){
        const currentUserEmail = e.target.parentElement.children[1].textContent;
        users.find((user) => {
            if(user.email === currentUserEmail){
                deleteAccount(user._id);
            }
        })
    }

    return  (
        <div className="dashboard-container">
            <div className="left-side">
                <header>
                    <h3>Delete misbehaving accounts</h3>
                </header>
            </div>
            <div className="users-container">
                {
                    users.map(eachUser => {
                        return(
                            <article className="list-item" key={eachUser._id}>
                                <h2>{eachUser.username}</h2>
                                <p>{eachUser.email}</p>
                                <button onClick={findUserId}>delete</button>
                            </article>
                        ) 
                    })
                }
            </div>
        </div>
    )
}