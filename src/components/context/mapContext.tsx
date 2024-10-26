import React, { createContext, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { Map } from "mapbox-gl";

// Define the context type
interface MapContextType {
  map: Map | null; // You may want to specify a more precise type based on your data structure
  setMap: (data: Map) => void;
}

// Create the context
const MapContext = createContext<MapContextType | undefined>(undefined);

// Create a provider component
export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [map, setMap] = useState<Map | null>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
};

// Custom hook to use the MapContext
export const useMapContext = (): MapContextType => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
