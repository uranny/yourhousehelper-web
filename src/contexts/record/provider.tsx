import { PropsWithChildren } from "react";
import { RecordContext } from "./context";
import { useRecord } from "../../hooks/useRecord";

export function RecordProvider({ children }: PropsWithChildren) {
  const value = useRecord();

  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  );
}