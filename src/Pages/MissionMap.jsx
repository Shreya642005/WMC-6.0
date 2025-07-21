import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "../components/Navbar";

// Fix leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const MapView = () => {
  const missions = [
    {
      id: 1,
      name: "Bank Robbery",
      lat: 40.7128,
      lng: -74.006,
      date: "2025-06-03",
      time: "14:30",
      place: "Wall Street",
      venue: "Midtown Federal Bank",
      description: "A high-profile robbery intercepted by the unit. Hostages were evacuated safely.",
    },
    {
      id: 2,
      name: "Train Hijack",
      lat: 34.0522,
      lng: -118.2437,
      date: "2025-06-10",
      time: "09:00",
      place: "Union Station",
      venue: "LA Central Terminal",
      description: "Suspects attempted to hijack a cargo train. Bomb squad neutralized the explosives.",
    },
    {
      id: 3,
      name: "Cyber Attack",
      lat: 37.7749,
      lng: -122.4194,
      date: "2025-06-15",
      time: "22:45",
      place: "Silicon Valley",
      venue: "TechCorp Data Center",
      description: "A major cyber breach was detected and mitigated. No data was compromised.",
    },
  ];

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white font-sans">
      <Navbar />

      <div className="text-center pt-10">
        <h1 className="text-4xl font-bold text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]">Mission Map</h1>
        <p className="text-gray-300 mt-2">Track all Web-Crawler missions in real-time</p>
      </div>

      <div className="flex justify-center items-center pt-8 pb-20">
        <div className="w-[100%] md:w-[75%] h-[500px] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.3)] border border-red-700">
          <MapContainer
            center={[39.5, -98.35]}
            zoom={4}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            />

            {missions.map((mission) => (
              <Marker key={mission.id} position={[mission.lat, mission.lng]}>
                <Popup className="custom-popup">
                  <div className="text-white text-sm bg-[#1e1e1e] p-3 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-red-400">{mission.name}</h3>
                    <p className="mb-2">{mission.description}</p>
                    <p><strong>Date:</strong> {mission.date}</p>
                    <p><strong>Time:</strong> {mission.time}</p>
                    <p><strong>Place:</strong> {mission.place}</p>
                    <p><strong>Venue:</strong> {mission.venue}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapView;
