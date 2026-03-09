export type RecordType = "INCOME" | "EXPENSE";

interface RecordItem {
  recordType: RecordType;
  cost: number;
  description: string;
  date: string;
}

interface GetRecordItem extends RecordItem {
  id: number;
}

interface CreateRecordRequest extends RecordItem {}

interface CreateRecordResponse {}

interface GetRecordRequest {
  startDate: string;
  endDate: string;
}

interface UpdateRecordRequest {
  recordType?: RecordType;
  cost?: number;
  description?: string;
  date?: string;
}

interface UpdateRecordResponse {}

interface DeleteRecordResponse {}

export {
  RecordItem,
  GetRecordItem,
  CreateRecordRequest,
  CreateRecordResponse,
  GetRecordRequest,
  UpdateRecordRequest,
  UpdateRecordResponse,
  DeleteRecordResponse,
};
