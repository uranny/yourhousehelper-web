import { createContext } from "react";
import { useDashboard } from "../../hooks/useDashboard";

export type DashboardContextValue = ReturnType<typeof useDashboard>;

export const DashboardContext = createContext<DashboardContextValue | null>(null);
