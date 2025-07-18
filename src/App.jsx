import { useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Hero from './components/Hero';
import MissionMap from './Pages/MissionMap';
import MissionFormPage from "./Pages/missionFormPage"


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[#151414] text-white min-h-screen">
      <Navbar />
      <Hero />
      <MissionFormPage />
      <MissionMap />
    </div>
  );
}

export default App;
