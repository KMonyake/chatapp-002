
// Updates profile data for existing users.
export default function useUpdateProfile(_id, email, password, username) {
    async function updateProfile() {
        if(_id && email && password && username){
            fetch(`${process.env.REACT_APP_SERVER_URL}/updateprofile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id, email, password, username })
            })
            .then(() => {
                alert("Profile updated successfully.");
                console.log("Profile updated.");
            })
            .catch(() => console.log("Error updating profile."))
        }
        else{
            alert("Please enter some data");
        }
    }
    
    return { updateProfile };
}