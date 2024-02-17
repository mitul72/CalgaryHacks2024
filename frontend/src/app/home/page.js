"use client";
import Map, { NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import classes from "./page.module.css";

export default function Home() {
  const mapboxToken =
    "pk.eyJ1Ijoic3RldmVncmVtb3J5IiwiYSI6ImNsc3FrNG9yZjEwcTkycXRnbzBmOXkxY3AifQ.CtolIBk6vgFoxaijMlX4IQ";

  return (
    <main className={classes.mainStyle}>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={classes.mapStyle}
        initialViewState={{
          latitude: 35.668641,
          longitude: 139.750567,
          zoom: 10,
        }}
        maxZoom={20}
        minZoom={3}
      >
        <GeolocateControl position="top-left" />

        <NavigationControl position="top-left" />
      </Map>
    </main>
  );
}
