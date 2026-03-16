import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import {
  useRecordsQuery,
  useCreateRecordMutation,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
} from "../queries/record/record.query";
import { useQueryClient } from "@tanstack/react-query";
import { RecordForm, RecordEntity, RecordItem } from "../types/record/record.type";
import { DEFAULT_RECORD } from "../constants/record";
import { showToast } from "../utils/toast";
import { QUERY_KEYS } from "../constants/query";

export function useRecord() {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const queryClient = useQueryClient();

  const [newRecord, setNewRecord] = useState<RecordItem>(DEFAULT_RECORD);
  const inputRefs = useRef<Array<HTMLSelectElement | HTMLInputElement | HTMLButtonElement | null>>([]);

  const handleChangeSelectedYear = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedYear(Number(e.target.value));
  const handleChangeSelectedMonth = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedMonth(Number(e.target.value));

  const registerRecordInputRef = (
    index: number,
    element: HTMLSelectElement | HTMLInputElement | HTMLButtonElement | null,
  ) => {
    inputRefs.current[index] = element;
  };

  const focusRecordInput = (index: number) => {
    const nextElement = inputRefs.current[index];

    if (!nextElement) {
      return;
    }

    nextElement.focus();

    if (
      nextElement instanceof HTMLInputElement
      && nextElement.type === "date"
      && typeof nextElement.showPicker === "function"
    ) {
      nextElement.showPicker();
    }
  };

  const handleRecordInputKeyDown = (
    event: KeyboardEvent<HTMLSelectElement | HTMLInputElement>,
    nextIndex: number,
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    focusRecordInput(nextIndex);
  };

  const handleRecordTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewRecord({
      ...newRecord,
      recordType: e.target.value as RecordItem["recordType"],
    });
  };

  const handleNewRecordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewRecord((prev) => ({
      ...prev,
      [name]: name === "cost" ? parseInt(value) : value,
    }));
  };

  const handleRecordFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddRecord();
  };

  // 기록 목록 조회
  const { data } = useRecordsQuery(
    selectedYear,
    selectedMonth,
  );

  const addMutation = useCreateRecordMutation();

  const editMutation = useUpdateRecordMutation();

  const deleteMutation = useDeleteRecordMutation();

  const filteredRecords: RecordEntity[] = data || [];

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<RecordItem>(DEFAULT_RECORD);

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    if (a.recordType === b.recordType) return 0;
    if (a.recordType === "EXPENSE") return -1;
    return 1;
  });

  const handleShowError = (error: Error) => showToast("error", error.message);

  const handleMutateSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.RECORDS, selectedYear, selectedMonth],
    });
  };

  const handleAddRecord = () => {
    if (!newRecord.cost || !newRecord.date) return;
    addMutation.mutate(
      {
        data: {
          recordType: newRecord.recordType,
          cost: Number(newRecord.cost),
          description: newRecord.description,
          date: newRecord.date,
        },
      },
      {
        onSuccess: () => {
          handleMutateSuccess();
          setNewRecord(DEFAULT_RECORD);
        },
        onError: handleShowError,
      },
    );
  };

  const handleEditRecordById = (id: number, newData: RecordForm) => {
    editMutation.mutate(
      {
        id,
        data: {
          recordType: newData.recordType,
          cost: Number(newData.cost),
          description: newData.description,
          date: newData.date,
        },
      },
      {
        onSuccess: handleMutateSuccess,
        onError: handleShowError,
      },
    );
  };

  const handleDeleteRecordById = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: handleMutateSuccess,
      onError: handleShowError,
    });
  };

  const handleEditClick = (idx: number) => {
    setEditIndex(idx);
    const record = sortedRecords[idx];
    if (!record) return;
    setEditData({ ...record });
  };

  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "cost" ? Number(value) : value,
    }));
  };

  const handleEditSave = () => {
    if (editIndex === null) return;
    const target = sortedRecords[editIndex];
    if (!target) return;

    handleEditRecordById(target.id, editData);
    setEditIndex(null);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
  };

  return {
    newRecord,
    setNewRecord,
    handleAddRecord,
    registerRecordInputRef,
    handleRecordInputKeyDown,
    handleRecordTypeChange,
    handleNewRecordInputChange,
    handleRecordFormSubmit,
    selectedYear,
    selectedMonth,
    filteredRecords,
    handleChangeSelectedMonth,
    handleChangeSelectedYear,
    handleEditRecordById,
    handleDeleteRecordById,
    sortedRecords,
    editIndex,
    editData,
    handleEditClick,
    handleEditChange,
    handleEditSave,
    handleEditCancel,
  };
}
