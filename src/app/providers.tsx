"use client";
import { GlobalDataSetContextProvider } from "@/components/context/globalDataSetContext";
import { MapProvider } from "@/components/context/mapContext";
import { TriggerContextProvider } from "@/components/context/triggerContecxt";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
const queryClient = new QueryClient();

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <TriggerContextProvider>
          <GlobalDataSetContextProvider>
            <MapProvider>
              <Provider store={store}>{children}</Provider>
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            </MapProvider>
          </GlobalDataSetContextProvider>
        </TriggerContextProvider>
        <Toaster />
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default Providers;
