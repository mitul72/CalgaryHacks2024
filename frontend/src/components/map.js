"use client";
import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { user } from "@nextui-org/react";

const Map = () => {
  const mapContainer = useRef(null);
  const [res, setRes] = useState([]);
  const [school, setSchool] = useState([]);
  const [street, setStreet] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [directions, setDirections] = useState(null);

  const setNavigationRoute = (origin, destination) => {
    if (directions) {
      directions.setOrigin(origin);
      directions.setDestination(destination);
    }
  };

  useEffect(() => {
    const fetchResCoords = async () => {
      const response = await fetch("/api/residential/coords");
      const jsonData = await response.json();
      setRes(jsonData);
    };

    const fetchSchoolCoords = async () => {
      const response = await fetch("/api/school/coords");
      const jsonData = await response.json();
      setSchool(jsonData);
    };

    const fetchStreetsCoords = async () => {
      const response = await fetch("/api/street/coords");
      const jsonData = await response.json();
      setStreet(jsonData);
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.longitude, position.coords.latitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
        setUserLocation([0, 0]); // Fallback to a default location
      }
    );

    Promise.all([
      fetchResCoords(),
      fetchSchoolCoords(),
      fetchStreetsCoords(),
    ]).then(() => {
      setMapLoaded(true);
    });
  }, []);
  useEffect(() => {
    if (mapLoaded && userLocation) {
      initializeMap();
    }
  }, [mapLoaded, userLocation, res, school, street]);

  const initializeMap = () => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic3RldmVncmVtb3J5IiwiYSI6ImNsc3FrNG9yZjEwcTkycXRnbzBmOXkxY3AifQ.CtolIBk6vgFoxaijMlX4IQ";
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: userLocation,
      zoom: 14,
    });

    map.on("load", () => {
      // Function to add sources and layers for each set of coordinates with clustering
      const addClusteredSourceAndLayer = (
        map,
        sourceId,
        coords,
        icon,
        iconSize
      ) => {
        const geojson = {
          type: "FeatureCollection",
          features: coords.map((coord) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: coord,
            },
          })),
        };

        map.loadImage(icon, (error, image) => {
          if (error) throw error;
          map.addImage(sourceId, image);

          map.addSource(sourceId, {
            type: "geojson",
            data: geojson,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
          });

          // Add a layer for the clusters using the same icon
          map.addLayer({
            id: `${sourceId}-clusters`,
            type: "symbol",
            source: sourceId,
            filter: ["has", "point_count"],
            layout: {
              "icon-image": sourceId,
              "icon-size": iconSize * 1.5, // You can adjust the size of the cluster icon
            },
          });

          // Add a layer for the unclustered points
          map.addLayer({
            id: `${sourceId}-unclustered`,
            type: "symbol",
            source: sourceId,
            filter: ["!", ["has", "point_count"]],
            layout: {
              "icon-image": sourceId,
              "icon-size": iconSize,
            },
          });
        });
      };

      // Add sources and layers for each set of coordinates with clustering
      addClusteredSourceAndLayer(
        map,
        "resPoints",
        res,
        "/images/private-garage.png",
        0.05
      );
      addClusteredSourceAndLayer(
        map,
        "schoolPoints",
        school,
        "/images/school-parking.png",
        0.05
      );
      addClusteredSourceAndLayer(
        map,
        "streetPoints",
        street,
        "/images/parked-car.png",
        0.05
      );

      // Add controls
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserLocation: true,
        }),
        "top-left"
      );
      map.addControl(new mapboxgl.NavigationControl(), "top-left");
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
        controls: {
          instructions: false,
          profileSwitcher: false,
          inputs: false,
        },
      });
      map.addControl(directions, "top-left");
      setDirections(directions);

      setMapRef(map);
    });
  };
  const navigateToCoordinate = (longitude, latitude) => {
    if (mapRef) {
      mapRef.flyTo({ center: [longitude, latitude], zoom: 14 });
    }
  };

  return (
    <>
      <button
        onClick={() =>
          setNavigationRoute([-122.4194, 37.7749], [-122.399, 37.791])
        }
      >
        Navigate to San Francisco
      </button>

      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
    </>
  );
};

export default Map;
