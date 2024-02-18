import { createContext, useState, useContext, useEffect } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const getWaypoint = (address) => {
    setNavigationRoute(userLocation, address);
  };

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

    Promise.all([
      fetchResCoords(),
      fetchSchoolCoords(),
      fetchStreetsCoords(),
    ]).then(() => {
      setMapLoaded(true);
    });
  }, []);
  const [res, setRes] = useState([]);
  const [school, setSchool] = useState([]);
  const [street, setStreet] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);

  return (
    <MapContext.Provider
      value={{
        res,
        setRes,
        school,
        setSchool,
        street,
        setStreet,
        mapLoaded,
        setMapLoaded,
        getWaypoint,
        userLocation,
        setUserLocation,
        setNavigationRoute,
        directions,
        setDirections,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useCoordinates = () => useContext(MapContext);
