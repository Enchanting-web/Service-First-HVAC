"use client";

import "leaflet/dist/leaflet.css";
import { Circle, CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { site } from "@/content/site";

const MILES_TO_METERS = 1609.34;

/**
 * Service-radius map. Rendered client-side only (see MapPanel) because Leaflet
 * touches `window` on import. Uses vector-free circles so no marker image
 * assets are needed.
 */
export function ServiceAreaMap() {
  const center: [number, number] = [site.address.lat, site.address.lng];

  return (
    <MapContainer
      center={center}
      zoom={9}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ backgroundColor: "var(--color-ink-deep)" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />

      <Circle
        center={center}
        radius={site.serviceRadiusMiles * MILES_TO_METERS}
        pathOptions={{
          color: "#e2611d",
          weight: 2,
          fillColor: "#e2611d",
          fillOpacity: 0.12,
        }}
      />

      <CircleMarker
        center={center}
        radius={7}
        pathOptions={{ color: "#ffffff", weight: 2, fillColor: "#c34800", fillOpacity: 1 }}
      >
        <Tooltip direction="top" offset={[0, -8]}>
          {site.shortName} — {site.address.street}, {site.address.city}
        </Tooltip>
      </CircleMarker>
    </MapContainer>
  );
}
