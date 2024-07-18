
import Header from './Header/Header';
import CssBaseline from '@mui/material/CssBaseline'; //Resets browser css
import { useState } from 'react';
import Main from './Main/Main.jsx';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <CssBaseline enableColorScheme /> {/* enableColorScheme sets the theme to be the user's system theme */}
      <Header user={user} setUser={setUser} />
      <Main user={user} setUser={setUser}/>
    </>
  )
}

export default App
