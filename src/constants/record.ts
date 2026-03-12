import { RecordType } from "../types/record/record.type";

export const RECORD_BACK_KEYS = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
};

export const RECORD_FRONT_KEYS = {
  INCOME: "수입",
  EXPENSE: "지출",
};

export const DEFAULT_RECORD = {
  recordType: RECORD_BACK_KEYS.EXPENSE as RecordType,
  cost: 0,
  description: "",
  date: "",
};