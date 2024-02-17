"use client";
import { useState, useEffect } from "react";
import Map, { NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import classes from "./page.module.css";

export default function MapComp() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/api/residential");
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    };

    fetchData();
    console.log(data);
  }, []);

  const mapboxToken =
    "pk.eyJ1Ijoic3RldmVncmVtb3J5IiwiYSI6ImNsc3FrNG9yZjEwcTkycXRnbzBmOXkxY3AifQ.CtolIBk6vgFoxaijMlX4IQ";
  // Define state for the initial view state of the map
  const [initialViewState, setInitialViewState] = useState({
    latitude: 51.0665447, // Default latitude
    longitude: -114.1233574, // Default longitude
    zoom: 10,
  });

  return (
    <div className={`${classes.mainStyle}`}>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={classes.mapStyle}
        initialViewState={initialViewState}
        maxZoom={20}
        minZoom={3}
      >
        <GeolocateControl
          position="top-left"
          trackUserLocation={true}
          showUserLocation={true}
          auto
        />

        <NavigationControl position="top-left" />
      </Map>
    </div>
  );
}
