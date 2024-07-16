
import './App.css'
import Main from './Main/Main'
import CssBaseline from '@mui/material/CssBaseline'; //Resets browser css

function App() {

  return (
    <>
      <CssBaseline enableColorScheme /> {/* enableColorScheme sets the theme to be the user's system theme */}
      <Main />
    </>
  )
}

export default App
