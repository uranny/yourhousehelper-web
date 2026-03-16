import { createContext } from "react";
import { useRecord } from "../../hooks/useRecord";

export type RecordContextValue = ReturnType<typeof useRecord>;

export const RecordContext = createContext<RecordContextValue | null>(null);
