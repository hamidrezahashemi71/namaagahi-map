"use client"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import { useState } from "react"
import { MapData } from "../lib/database";

const EditMap = () => {

    const [coords, setCoords] = useState({ lat: 0, lng: 0 })
    const [markerPosition, setMarkerPosition] = useState(null)
  
    const handleMapClick = (e) => {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng })
      setMarkerPosition(e.latlng)
    }
  
    function MapClickHandler() {
      useMapEvents({ click: handleMapClick })
      return null
    }
  
    function LeafIcon({ iconUrl }) {
      L.Icon.call(this, {
        iconUrl,
        shadowUrl: '',
        iconSize: [42, 42],
        shadowSize: [50, 50],
        iconAnchor: [38, 38],
        shadowAnchor: [38, 38],
        popupAnchor: [-20, -38],
      });
    }
    
    LeafIcon.prototype = Object.create(L.Icon.prototype);
    LeafIcon.prototype.constructor = LeafIcon;
    
    const purpleIcon = new LeafIcon({ iconUrl: '/images/Billboard-purple.png' })
    const yellowIcon = new LeafIcon({ iconUrl: '/images/Billboard-yellow.png' })

  return (
        <main className="min-h-screen">
      <div className="w-full h-screen mb-4 relative rounded-xl z-40">
        <MapContainer
          className="outline-none h-full"
          center={[35.73825, 51.50962]}
          zoom={16}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markerPosition && <Marker position={markerPosition} icon={yellowIcon} />}
          <MapClickHandler />
        {MapData.map((item) => {
          return(
            <Marker
              key={item.id}
              icon={purpleIcon}
              position={[item.locationX, item.locationY]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
          </Marker>
          )
        })}
        </MapContainer>
      </div>
    </main>
  )
}

export default EditMap