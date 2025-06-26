import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  iconSize: [25, 41],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Coverage = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [mapPosition, setMapPosition] = useState([23.7, 90.3]);
  const [mapZoom, setMapZoom] = useState(7);

  useEffect(() => {
    fetch("/bd-districts.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed loading district data", err));
  }, []);

  const filteredData = data
    ? data.filter((d) =>
        d.district.toLowerCase().includes(search.toLowerCase().trim())
      )
    : [];

  useEffect(() => {
    if (filteredData.length === 1) {
      const district = filteredData[0];
      setMapPosition([district.latitude, district.longitude]);
      setMapZoom(10);
    } else if (search.trim() === "") {
      setMapPosition([23.7, 90.3]);
      setMapZoom(7);
    }
  }, [filteredData, search]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-10 my-10">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-6">
        We are available in 64 districts
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search district..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="border border-gray-300 rounded-xl overflow-hidden">
        <MapContainer
          center={mapPosition}
          zoom={mapZoom}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "500px" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {(filteredData.length > 0 ? filteredData : data || []).map(
            (district, idx) => (
              <Marker
                key={idx}
                position={[district.latitude, district.longitude]}
                eventHandlers={{
                  mouseover: () => setHoveredDistrict(district.district),
                  mouseout: () => setHoveredDistrict(null),
                }}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold text-lg">{district.district}</h3>
                    <p>Region: {district.region}</p>
                    <p>City: {district.city}</p>
                    <p>Areas: {district.covered_area.join(", ")}</p>
                    <a
                      href={district.flowchart}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      Flowchart
                    </a>
                  </div>
                </Popup>
              </Marker>
            )
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;