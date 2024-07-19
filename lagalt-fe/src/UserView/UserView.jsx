import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlBackendBasePath } from "../assets/urls";

function UserView() {
    const { userId } = useParams();
    const [profileUser, setProfileUser] = useState(null);

    useEffect(() => {
        //fetch user data. get user by user id
        fetchUserById();

        //display username, email, skills. skills should not be visible if hidden is true
        //skills should be visible even if hidden is true if this user is an applicant of a project AND user.userId is the owner of that project
    }, [])

    const fetchUserById = async () => {
        const headers = {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${token}`,
        };
      
        const fetchresponse = await fetch(`${urlBackendBasePath}/users/${userId}`, {
          method: "GET",
          headers: headers,
        });
      
        if (!fetchresponse.ok) {
          throw new Error("Failed to get user from the database");
        }
      
        const response = await fetchresponse.json();
      
        console.dir(response, { depth: null });
      
        setProfileUser(response.data);
      }

    return (
        <>
        <p>Name: {profileUser.username}</p>
        <p>Hidden: {profileUser.hidden}</p>
        <p>Skills: {profileUser.skills}</p>
        </>
    )
}

export default UserView