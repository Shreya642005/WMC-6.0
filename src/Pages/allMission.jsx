import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/allMissions.css';

// Fix leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

// Create custom Spiderman marker
const spiderIcon = new L.Icon({
  iconUrl: '/images/spider-marker.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Fallback to default marker if custom icon doesn't exist
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const AllMissions = () => {
  const [missions, setMissions] = useState([]);
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [view, setView] = useState('cards'); // 'cards', 'map', 'both'
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedMission, setSelectedMission] = useState(null);
  const [showNewMissionAlert, setShowNewMissionAlert] = useState(false);
  const [hoveredMissionId, setHoveredMissionId] = useState(null);
  const mapRef = useRef();

  // Sample missions data - in real app, this would come from localStorage or API
  const sampleMissions = [
    {
      id: 1,
      title: "Bank Robbery Foiled",
      description: "Stopped three armed robbers at First National Bank",
      date: "2024-01-15",
      time: "14:30",
      location: "Manhattan, NY",
      urgency: "high",
      status: "completed",
      lat: 40.7589,
      lng: -73.9851,
      fullDescription: "Responded to silent alarm at First National Bank. Three armed suspects had taken hostages. Used web-shooters to disarm suspects and evacuated all civilians safely. No injuries reported.",
      tags: ["robbery", "hostages", "manhattan"]
    },
    {
      id: 2,
      title: "Cat Rescue Operation",
      description: "Rescued Mrs. Chen's cat from 20-story building",
      date: "2024-01-14",
      time: "09:15",
      location: "Queens, NY",
      urgency: "low",
      status: "completed",
      lat: 40.7282,
      lng: -73.7949,
      fullDescription: "Mrs. Chen's cat Whiskers was stuck on the 20th floor of an apartment building. Used web-lines to safely retrieve the cat and return it to its grateful owner.",
      tags: ["rescue", "queens", "animal"]
    },
    {
      id: 3,
      title: "Train Derailment Prevention",
      description: "Prevented subway derailment during rush hour",
      date: "2024-01-13",
      time: "17:45",
      location: "Brooklyn, NY",
      urgency: "critical",
      status: "completed",
      lat: 40.6782,
      lng: -73.9442,
      fullDescription: "Detected structural damage to subway tracks during evening patrol. Managed to stop incoming train and coordinate with MTA for emergency repairs. Potentially saved hundreds of lives.",
      tags: ["transport", "brooklyn", "emergency"]
    },
    {
      id: 4,
      title: "Convenience Store Robbery",
      description: "Interrupted armed robbery in progress",
      date: "2024-01-12",
      time: "23:20",
      location: "The Bronx, NY",
      urgency: "medium",
      status: "completed",
      lat: 40.8448,
      lng: -73.8648,
      fullDescription: "Witnessed armed robbery while on night patrol. Webbed up the perpetrator and ensured the store owner was safe. Police arrived within minutes to make the arrest.",
      tags: ["robbery", "bronx", "night-patrol"]
    },
    {
      id: 5,
      title: "Fire Rescue Assistance",
      description: "Helped evacuate burning apartment building",
      date: "2024-01-11",
      time: "02:30",
      location: "Staten Island, NY",
      urgency: "critical",
      status: "completed",
      lat: 40.5795,
      lng: -74.1502,
      fullDescription: "Assisted FDNY in evacuating residents from a 15-story apartment fire. Used web-lines to reach upper floors and help rescue trapped families. All residents evacuated safely.",
      tags: ["fire", "rescue", "staten-island"]
    },
    {
      id: 6,
      title: "Bridge Cable Repair",
      description: "Emergency repair of damaged bridge cables",
      date: "2024-01-10",
      time: "11:00",
      location: "Manhattan Bridge, NY",
      urgency: "high",
      status: "in-progress",
      lat: 40.7067,
      lng: -73.9902,
      fullDescription: "Discovered damaged support cables on Manhattan Bridge during routine patrol. Provided temporary reinforcement with webbing while engineering crews assess the situation.",
      tags: ["infrastructure", "manhattan", "ongoing"]
    }
  ];

  useEffect(() => {
    // Load missions from localStorage or use sample data
    const savedMissions = localStorage.getItem('spiderman-missions');
    if (savedMissions) {
      const parsedMissions = JSON.parse(savedMissions);
      setMissions(parsedMissions);
      setFilteredMissions(parsedMissions);
    } else {
      setMissions(sampleMissions);
      setFilteredMissions(sampleMissions);
      localStorage.setItem('spiderman-missions', JSON.stringify(sampleMissions));
    }
  }, []);

  useEffect(() => {
    // Filter and sort missions
    let filtered = [...missions];

    // Apply filters
    if (filterBy !== 'all') {
      filtered = filtered.filter(mission => mission.urgency === filterBy);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'urgency':
          const urgencyOrder = { critical: 3, high: 2, medium: 1, low: 0 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    setFilteredMissions(filtered);
  }, [missions, sortBy, filterBy]);

  // Listen for new missions (from form submission)
  useEffect(() => {
    const handleNewMission = (event) => {
      const newMission = event.detail;
      setMissions(prev => [newMission, ...prev]);
      setShowNewMissionAlert(true);
      
      // Play a subtle notification sound (Web Audio API)
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        // Silently fail if audio is not supported
        console.log('Audio notification not supported');
      }
      
      setTimeout(() => setShowNewMissionAlert(false), 3000);
    };

    window.addEventListener('newMissionAdded', handleNewMission);
    return () => window.removeEventListener('newMissionAdded', handleNewMission);
  }, []);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'border-red-500 shadow-red-500/20';
      case 'high': return 'border-orange-500 shadow-orange-500/20';
      case 'medium': return 'border-yellow-500 shadow-yellow-500/20';
      case 'low': return 'border-green-500 shadow-green-500/20';
      default: return 'border-gray-500 shadow-gray-500/20';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '📍';
      case 'low': return '🟢';
      default: return '📍';
    }
  };

  const handleMissionClick = (mission) => {
    setSelectedMission(mission);
    if (mapRef.current && view !== 'cards') {
      mapRef.current.setView([mission.lat, mission.lng], 15);
    }
  };

  const handleMissionHover = (missionId) => {
    setHoveredMissionId(missionId);
    
    // If in split view, highlight the corresponding marker
    if (view === 'both' && mapRef.current) {
      // This would require additional map marker refs for full implementation
      // For now, we'll just log the interaction
      if (missionId) {
        console.log(`Highlighting mission ${missionId} on map`);
      }
    }
  };

  return (
    <div className="all-missions-container">
      {/* Background Elements */}
      <div className="missions-background">
        <div className="floating-web web-1"></div>
        <div className="floating-web web-2"></div>
        <div className="floating-web web-3"></div>
        <div className="spider-logo-bg"></div>
      </div>

      {/* New Mission Alert */}
      {showNewMissionAlert && (
        <div className="new-mission-alert">
          <div className="alert-icon">🕸️</div>
          <div className="alert-content">
            <h3>New Mission Deployed!</h3>
            <p>Mission successfully added to the database</p>
          </div>
          <div className="alert-web-animation"></div>
        </div>
      )}

      {/* Header */}
      <div className="missions-header">
        <div className="header-content">
          <div className="header-icon">
            <span className="spider-icon">🕷️</span>
          </div>
          <h1 className="main-title">ALL MISSIONS</h1>
          <p className="subtitle">Web-Crawler Mission Archive & Operations Center</p>
          
          {/* Mission Counter */}
          <div className="mission-counter">
            <span className="counter-icon">🕸️</span>
            <span className="counter-text">
              {filteredMissions.length} active missions and counting...
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="missions-controls">
        <div className="controls-left">
          <div className="control-group">
            <label>View:</label>
            <select value={view} onChange={(e) => setView(e.target.value)} className="control-select">
              <option value="cards">Card View</option>
              <option value="map">Map Only</option>
              <option value="both">Both</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="control-select">
              <option value="date">Date</option>
              <option value="urgency">Urgency</option>
              <option value="location">Location</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Filter:</label>
            <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)} className="control-select">
              <option value="all">All Missions</option>
              <option value="critical">Critical</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`missions-content ${view === 'both' ? 'split-view' : ''}`}>
        {/* Mission Cards */}
        {(view === 'cards' || view === 'both') && (
          <div className="missions-grid">
            {filteredMissions.map((mission, index) => (
              <div
                key={mission.id}
                data-mission-id={mission.id}
                className={`mission-card ${getUrgencyColor(mission.urgency)} ${
                  hoveredMissionId === mission.id ? 'hovered' : ''
                } ${mission.urgency === 'critical' ? 'critical-pulse' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleMissionClick(mission)}
                onMouseEnter={() => handleMissionHover(mission.id)}
                onMouseLeave={() => handleMissionHover(null)}
              >
                <div className="card-header">
                  <div className="urgency-badge">
                    <span className="urgency-icon">{getUrgencyIcon(mission.urgency)}</span>
                    <span className="urgency-text">{mission.urgency.toUpperCase()}</span>
                  </div>
                  <div className={`status-indicator ${mission.status}`}></div>
                </div>
                
                <div className="card-content">
                  <h3 className="mission-title">{mission.title}</h3>
                  <p className="mission-description">{mission.description}</p>
                  
                  <div className="mission-details">
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span>{mission.date}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🕐</span>
                      <span>{mission.time}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{mission.location}</span>
                    </div>
                  </div>
                  
                  <div className="mission-tags">
                    {mission.tags?.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="card-footer">
                  <button className="view-details-btn">
                    <span>View Details</span>
                    <span className="btn-icon">🔍</span>
                  </button>
                </div>
                
                {mission.urgency === 'critical' && (
                  <div className="emergency-glow"></div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Map View */}
        {(view === 'map' || view === 'both') && (
          <div className="map-container">
            <MapContainer
              center={[40.7128, -74.0060]}
              zoom={11}
              ref={mapRef}
              style={{ height: '100%', width: '100%' }}
              className="mission-map"
            >
              <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
              />
              
              {filteredMissions.map((mission) => (
                <Marker
                  key={mission.id}
                  position={[mission.lat, mission.lng]}
                  icon={spiderIcon || defaultIcon}
                  eventHandlers={{
                    click: () => handleMissionClick(mission),
                    mouseover: () => handleMissionHover(mission.id),
                    mouseout: () => handleMissionHover(null)
                  }}
                >
                  <Popup className="spider-popup">
                    <div className="popup-content">
                      <div className="popup-header">
                        <h3>{mission.title}</h3>
                        <div className={`popup-urgency ${mission.urgency}`}>
                          {getUrgencyIcon(mission.urgency)} {mission.urgency}
                        </div>
                      </div>
                      <p>{mission.description}</p>
                      <div className="popup-details">
                        <div>📅 {mission.date} at {mission.time}</div>
                        <div>📍 {mission.location}</div>
                      </div>
                      <button 
                        className="popup-btn"
                        onClick={() => {
                          // Scroll to mission card if in split view
                          if (view === 'both') {
                            const cardElement = document.querySelector(`[data-mission-id="${mission.id}"]`);
                            if (cardElement) {
                              cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                          }
                        }}
                      >
                        View Full Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && (
        <div className="mission-modal-overlay" onClick={() => setSelectedMission(null)}>
          <div className="mission-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedMission.title}</h2>
              <button className="close-btn" onClick={() => setSelectedMission(null)}>
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="modal-urgency-badge">
                <span className={`urgency-indicator ${selectedMission.urgency}`}>
                  {getUrgencyIcon(selectedMission.urgency)} {selectedMission.urgency.toUpperCase()}
                </span>
              </div>
              
              <div className="modal-details-grid">
                <div className="detail-group">
                  <label>Date & Time:</label>
                  <span>{selectedMission.date} at {selectedMission.time}</span>
                </div>
                <div className="detail-group">
                  <label>Location:</label>
                  <span>{selectedMission.location}</span>
                </div>
                <div className="detail-group">
                  <label>Status:</label>
                  <span className={`status-badge ${selectedMission.status}`}>
                    {selectedMission.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="modal-description">
                <h3>Mission Report:</h3>
                <p>{selectedMission.fullDescription}</p>
              </div>
              
              {selectedMission.tags && (
                <div className="modal-tags">
                  <h4>Tags:</h4>
                  <div className="tags-container">
                    {selectedMission.tags.map(tag => (
                      <span key={tag} className="modal-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllMissions;