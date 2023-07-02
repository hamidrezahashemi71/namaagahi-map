"use client"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import { MapData } from "./lib/database"
import dynamic from 'next/dynamic'
import { useState } from "react";
import Image from "next/image";
const SideMenu = dynamic(() => import('./components/SideMenu'), { ssr: false })

export const metadata = {
  title: 'لوکیشن بیلبوردهای نماآگهی',
  description: 'بیلبوردهای فعال نماآگهی',
}

export default function Home() {

  const [selectedIds, setSelectedIds] = useState([])

  const handleSelectedIdsChange = (newSelectedIds) => setSelectedIds(newSelectedIds);
   
  const iconUrls = {
    purple: '/icons/Billboard-purple.png',
    yellow: '/icons/Billboard-yellow.png',
  }
  
  const iconProps = {
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -42],
  }
  
  const purpleIcon = L.icon({ ...iconProps, iconUrl: iconUrls.purple });
  const yellowIcon = L.icon({ ...iconProps, iconUrl: iconUrls.yellow });

  return (
    <main className="min-h-screen">
      <SideMenu
        selectedIds={selectedIds} 
        onSelectedIdsChange={handleSelectedIdsChange}
      />
      <div className="w-full h-screen mb-4 relative rounded-xl z-40 overflow-hidden">
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
        {MapData.map(({ id, locationX: lat, locationY: lng, same, address }) => {
          const isSelected = selectedIds.includes(id);
          const icon = isSelected ? yellowIcon : purpleIcon;

          if (!same) {
            return (
              <Marker
                key={id}
                icon={icon}
                position={[lat, lng]}
              >
                <Popup>
                  <div className="w-72 h-fit font-bold flex flex-col justify-center items-center overflow-hidden">
                    <Image
                      className="rounded-md"
                      src={`/images/${id}.jpg`}
                      width={280}
                      height={100}
                    />
                    <p>{id}</p>
                    <p>{address}</p>
                  </div>
                </Popup>
              </Marker>
            );
          } else {
            const related = MapData.find((item) => item.id === same);
            if (related) {
              return (
                <Marker
                  key={id}
                  icon={icon}
                  position={[lat, lng]}
                >
                  <Popup>
                    <div className="w-72 h-fit font-bold flex flex-col justify-center items-center overflow-hidden">
                      <Image
                        className="rounded-md"
                        src={`/images/${id}.jpg`}
                        width={280}
                        height={100}
                      />
                      <p>{id}</p>
                      <p>{address}</p>
                      <Image
                        className="rounded-md"
                        src={`/images/${same}.jpg`}
                        width={280}
                        height={100}
                      />
                      <p>{related.id}</p>
                      <p>{related.address}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            } else {
              return null;
            }
          }
        })}
        </MapContainer>
      </div>
    </main>
  )
}