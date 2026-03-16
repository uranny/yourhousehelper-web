import { PropsWithChildren } from "react";
import { DashboardContext } from "./context";
import { useDashboard } from "../../hooks/useDashboard";

export function DashboardProvider({ children }: PropsWithChildren) {
  const value = useDashboard();

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
}
