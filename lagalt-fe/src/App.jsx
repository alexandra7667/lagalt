
import './App.css'
import Main from './Main/Main'
import Header from './Header/Header';
import CssBaseline from '@mui/material/CssBaseline'; //Resets browser css
import { useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);

  //Log in to get token, user id, username, email
  
  return (
    <>
      <CssBaseline enableColorScheme /> {/* enableColorScheme sets the theme to be the user's system theme */}
      <Header user={user} setUser={setUser}/>
      <Main user={user}/>
    </>
  )
}

export default App
