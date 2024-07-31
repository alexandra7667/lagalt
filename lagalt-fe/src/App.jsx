
import Header from './Header/Header';
import CssBaseline from '@mui/material/CssBaseline'; //Resets browser css
import { useEffect, useState, createContext } from 'react';
import { Main } from './Main/Main.jsx';
import { restoreUser } from './RestoreUser.js';
import Footer from './Footer/Footer.jsx';
import { Box } from '@mui/material';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      restoreUser(token, setUser);
    }
  }, []);

  return (
    <>
      <CssBaseline enableColorScheme /> {/* enableColorScheme sets the theme to be the user's system theme */}
      <UserContext.Provider value={{ user, setUser }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box sx={{ flex: 1 }}>
            <Main />
          </Box>
          <Footer />
        </Box>
      </UserContext.Provider>
    </>
  )
}


export { App, UserContext }
