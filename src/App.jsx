import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
 import SideBar from './components/Sidebar/Sidebar.jsx'
import Main from './components/Main/Main.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <SideBar />
        <Main/>
    </>
  )
}

export default App
