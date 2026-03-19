import { useContext } from "react";
import { ReportContext } from "./context";

export function useReportContext() {
  const context = useContext(ReportContext);

  if (!context) {
    throw new Error("useReportContext must be used within ReportProvider");
  }

  return context;
}
