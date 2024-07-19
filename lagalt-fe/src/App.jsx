
import Header from './Header/Header';
import CssBaseline from '@mui/material/CssBaseline'; //Resets browser css
import { useEffect, useState, createContext } from 'react';
import { Main } from './Main/Main.jsx';
import RefreshUser from './RefreshUser.js';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    RefreshUser(setUser);
  }, []);

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
