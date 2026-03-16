import { useContext } from "react";
import { RecordContext } from "./context";

export function useRecordContext() {
  const context = useContext(RecordContext);

  if (!context) {
    throw new Error("useRecordContext must be used within RecordProvider");
  }

  return context;
}
