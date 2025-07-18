import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import L from "leaflet";

// Fix leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
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
      description:
        "A high-profile robbery intercepted by the unit. Hostages were evacuated safely.",
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
      description:
        "Suspects attempted to hijack a cargo train. Bomb squad neutralized the explosives.",
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
      description:
        "A major cyber breach was detected and mitigated. No data was compromised.",
    },
  ];

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white">
      {/* Navbar (include if needed) */}
      {/* <Navbar /> */}

      {/* Map Container */}
      <div className="flex justify-center items-center pt-10 pb-16">
        <div className="w-[90%] md:w-[70%] h-[500px] rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={[39.5, -98.35]}
            zoom={4}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {missions.map((mission) => (
              <Marker
                key={mission.id}
                position={[mission.lat, mission.lng]}
                title={mission.name}
              >
                <Popup>
                  <div className="text-sm font-sans leading-tight">
                    <h3 className="text-lg font-bold">{mission.name}</h3>
                    <p>{mission.description}</p>
                    <p>
                      <strong>Date:</strong> {mission.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {mission.time}
                    </p>
                    <p>
                      <strong>Place:</strong> {mission.place}
                    </p>
                    <p>
                      <strong>Venue:</strong> {mission.venue}
                    </p>
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
