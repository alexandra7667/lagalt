import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle";
import fetchData from "../../functions/fetchData";

function UserView() {
  const { userId } = useParams(); //The user being viewed
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    fetchUserById(userId, setProfileUser);
  }, [])

  async function fetchUserById() {
    const response = await fetchData(
      `users/${userId}`,
      "GET",
      null,
      "Could not fetch user by id."
    );
    if (response.status === "error") {
      console.error(response.message);
    } else {
      setProfileUser(response.data);
    }
  }


  return (
    <>
      {profileUser ? (
        <>
          <PageTitle title={profileUser.username} />

          <p>{profileUser.email}</p>

          <p>About: {profileUser.description}</p>

          {!profileUser.hidden && (
            <p>Skills: {profileUser.skills}</p>
          )}

        </>
      ) : (
        <PageTitle title={"User not found"} />
      )}

    </>
  )
}

export default UserView