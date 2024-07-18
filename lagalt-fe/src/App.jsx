
import Header from './Header/Header';
import CssBaseline from '@mui/material/CssBaseline'; //Resets browser css
import { useEffect, useState, createContext } from 'react';
import { Main } from './Main/Main.jsx';
import { urlBackendBasePath } from './assets/urls.js';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserByToken(token);
    }
  }, []);

  async function getUserByToken(token) {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    const fetchUserResponse = await fetch(`${urlBackendBasePath}/users`, {
      method: "GET",
      headers: headers,
    });

    if (!fetchUserResponse.ok) {
      throw new Error("Failed to get user from the database");
    }

    const userResponse = await fetchUserResponse.json();

    console.log("REFRESH USER: ", userResponse.data);

    setUser(userResponse.data);
  }

  return (
    <>
      <CssBaseline enableColorScheme /> {/* enableColorScheme sets the theme to be the user's system theme */}
      <UserContext.Provider value={{ user, setUser}}>
        <Header />
        <Main />
      </UserContext.Provider>
    </>
  )
}


export { App, UserContext }
