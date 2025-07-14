import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar";
import Home from './Pages/home';
import Hero from './components/Hero';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home />
    </>
  )
}

export default App
