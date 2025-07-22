import { useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Hero from './components/Hero';
import MissionMap from './Pages/MissionMap';
import MissionFormPage from "./Pages/missionFormPage";
import AllMissions from './Pages/allMission';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <MissionFormPage />
            <MissionMap />
          </>
        );
      case 'all-missions':
        return <AllMissions />;
      case 'mission-log':
        return <MissionFormPage />;
      case 'map-view':
        return <MissionMap />;
      default:
        return (
          <>
            <Hero />
            <MissionFormPage />
            <MissionMap />
          </>
        );
    }
  };

  return (
    <div className="bg-[#151414] text-white min-h-screen">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;
