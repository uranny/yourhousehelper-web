import { createContext, PropsWithChildren, useContext } from "react";
import { useDashboard } from "../../hooks/useDashboard";

type DashboardContextValue = ReturnType<typeof useDashboard>;

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: PropsWithChildren) {
  const value = useDashboard();

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboardContext must be used within DashboardProvider");
  }

  return context;
}
