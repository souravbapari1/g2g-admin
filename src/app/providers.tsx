"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { TriggerContextProvider } from "@/components/context/triggerContecxt";
import { GlobalDataSetContextProvider } from "@/components/context/globalDataSetContext";

function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <TriggerContextProvider>
        <GlobalDataSetContextProvider>
          <Provider store={store}>{children}</Provider>
        </GlobalDataSetContextProvider>
      </TriggerContextProvider>
      <Toaster />
    </SessionProvider>
  );
}

export default Providers;
