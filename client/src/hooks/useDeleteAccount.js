
// Deletes the current user's account or deletes a user from the admin page.
export default function useDeleteAccount() {
    async function deleteAccount(_id){
        console.log("deleting profile");
        if(_id){
            const fetchedData = await fetch(`${process.env.REACT_APP_SERVER_URL}/deleteaccount`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "bearerHeader " + localStorage.getItem("userToken"), 
                },
                body: JSON.stringify({ _id})
            })
            .then(() => {
                if(window.location.pathname === "/profile"){
                    alert("Account successfully deleted. Hopefully we'll see you again.");
                    // Disble auto login
                    localStorage.clear();
                }
                else{
                    alert("Account deleted.");
                }
                window.location.reload();
            })
        }
    }
    
    return { deleteAccount };
}