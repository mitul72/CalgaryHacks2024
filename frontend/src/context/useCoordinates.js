import { createContext, useState, useContext, useEffect } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
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
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useCoordinates = () => useContext(MapContext);
