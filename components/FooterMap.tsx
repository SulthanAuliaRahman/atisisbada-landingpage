"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const FooterMap = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <MapContainer
      key="footer-map"
      center={[-6.2, 106.816666]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-40 w-full"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
      />
      <Marker position={[-6.2, 106.816666]}>
        <Popup>Lokasi contoh</Popup>
      </Marker>
    </MapContainer>
  );
};

export default FooterMap;
