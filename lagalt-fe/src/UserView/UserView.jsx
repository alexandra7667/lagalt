import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchUserById from "./GetUserById.js";
import PageTitle from "../PageTitle/PageTitle";

function UserView() {
  const { userId } = useParams(); //The user being viewed
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    fetchUserById(userId, setProfileUser);
  }, [])


  return (
    <>
      {profileUser ? (
        <>
          <PageTitle title={profileUser.username} />

          <p>{profileUser.email}</p>

          <p>About: {profileUser.description}</p>

          {!profileUser.hidden (
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