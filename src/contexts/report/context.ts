import { createContext } from "react";
import { useReport } from "../../hooks/useReport";

export type ReportContextValue = ReturnType<typeof useReport>;

export const ReportContext = createContext<ReportContextValue | null>(null);
