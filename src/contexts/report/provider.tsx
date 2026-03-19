import { PropsWithChildren } from "react";
import { ReportContext } from "./context";
import { useReport } from "../../hooks/useReport";

export function ReportProvider({ children }: PropsWithChildren) {
  const value = useReport();

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
}
