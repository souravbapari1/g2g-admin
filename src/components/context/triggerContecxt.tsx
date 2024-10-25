// note: this i used for dynamicy  userffect qany page any ware
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface TriggerContextType {
  projectTypeTrigger: number;
  sdgTrigger: number;
  unitTypeTrigger: number;
  treeTypeTrigger: number;

  triggerProjectTypeEffect: () => void;
  triggerSDGEffect: () => void;
  triggerUnitTypeEffect: () => void;
  triggerTreeTypeEffect: () => void;
}

// Create the context with a default value
const TriggerContext = createContext<TriggerContextType | undefined>(undefined);

// Define the provider component
export const TriggerContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projectTypeTrigger, setProjectTypeTrigger] = useState(0);
  const [sdgTrigger, setSdgTrigger] = useState(0);

  const [unitTypeTrigger, setUnitTypeTrigger] = useState(0);
  const [treeTypeTrigger, setTreeTypeTrigger] = useState(0);

  const triggerProjectTypeEffect = () => {
    setProjectTypeTrigger(projectTypeTrigger + 1);
  };

  const triggerTreeTypeEffect = () => {
    setTreeTypeTrigger(treeTypeTrigger + 1);
  };

  const triggerSDGEffect = () => {
    setSdgTrigger(sdgTrigger + 1);
  };

  const triggerUnitTypeEffect = () => {
    setUnitTypeTrigger(unitTypeTrigger + 1);
  };

  return (
    <TriggerContext.Provider
      value={{
        treeTypeTrigger,
        triggerTreeTypeEffect,
        projectTypeTrigger,
        triggerProjectTypeEffect,
        sdgTrigger,
        triggerSDGEffect,
        triggerUnitTypeEffect,
        unitTypeTrigger,
      }}
    >
      {children}
    </TriggerContext.Provider>
  );
};

// Custom hook to use the TriggerContext
export const useTriggerContext = () => {
  const context = useContext(TriggerContext);
  if (!context) {
    throw new Error(
      "useTriggerContext must be used within a TriggerContextProvider"
    );
  }
  return context;
};
