import { ToastContainer } from 'react-toastify'
import './style.css';
import './App.css';
import Game from './components/Game'

function App() {

  return (
    <>
      <Game />
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
