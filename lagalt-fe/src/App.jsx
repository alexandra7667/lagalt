
import Header from './Header/Header';
import CssBaseline from '@mui/material/CssBaseline'; //Resets browser css
import { useEffect, useState, createContext } from 'react';
import { Main } from './Main/Main.jsx';
import { restoreUser } from './RestoreUser.js';
import Footer from './Footer/Footer.jsx';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const UserContext = createContext();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(lightTheme)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      restoreUser(token, setUser);
    }
  }, []);

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider value={{ user, setUser }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header theme={theme} setTheme={setTheme} darkTheme={darkTheme} lightTheme={lightTheme} />
          <Box sx={{ flex: 1 }}>
            <Main />
          </Box>
          <Footer />
        </Box>
      </UserContext.Provider>
      </ThemeProvider>
    </>
  )
}


export { App, UserContext }
