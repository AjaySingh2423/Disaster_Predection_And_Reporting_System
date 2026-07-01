import './App.css'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import { Outlet } from "react-router-dom";
function App() {
  

  return (
    <>
    <Outlet /> {/* Pages will render here */}
    </>
  )
}

export default App
