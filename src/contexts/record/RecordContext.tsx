import { createContext, PropsWithChildren, useContext } from "react";
import { useRecord } from "../../hooks/useRecord";

type RecordContextValue = ReturnType<typeof useRecord>;

const RecordContext = createContext<RecordContextValue | null>(null);

export function RecordProvider({ children }: PropsWithChildren) {
  const value = useRecord();

  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  );
}

export function useRecordContext() {
  const context = useContext(RecordContext);

  if (!context) {
    throw new Error("useRecordContext must be used within RecordProvider");
  }

  return context;
}
