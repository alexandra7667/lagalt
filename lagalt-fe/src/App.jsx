
import './App.css'
import Main from './Main/Main'
import Header from './Header/Header';
import CssBaseline from '@mui/material/CssBaseline'; //Resets browser css

function App() {

  return (
    <>
      <CssBaseline enableColorScheme /> {/* enableColorScheme sets the theme to be the user's system theme */}
      <Header />
      <Main />
    </>
  )
}

export default App
