"use client";

import type { RecordEntity } from "@/types/record/record.type";
import EditModal from "@/components/record/edit-modal";
import { bodyText } from "@/constants/typography";
import DeleteRecordButton from "@/components/record/delete-record-button";
import { useRecordStore } from "@/store/record";

const TYPE_LABEL: Record<RecordEntity["recordType"], string> = {
  INCOME: "수입",
  EXPENSE: "지출",
};

export default function RecordTable() {
  const { records: rows } = useRecordStore();
  return (
    <>
      <div className="w-full overflow-x-auto rounded-2xl bg-surface">
        <table className="w-full border-collapse bg-transparent">
          <thead>
            <tr>
              <th
                className={`border-b border-border bg-surface p-3 text-center text-text ${bodyText}`}
              >
                날짜
              </th>
              <th
                className={`border-b border-border bg-surface p-3 text-center text-text ${bodyText}`}
              >
                구분
              </th>
              <th
                className={`border-b border-border bg-surface p-3 text-center text-text ${bodyText}`}
              >
                금액
              </th>
              <th
                className={`border-b border-border bg-surface p-3 text-center text-text ${bodyText}`}
              >
                사유
              </th>
              <th
                className={`border-b border-border bg-surface p-3 text-center text-text ${bodyText}`}
              >
                수정
              </th>
              <th
                className={`border-b border-border bg-surface p-3 text-center text-text ${bodyText}`}
              >
                삭제
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className={`w-full border-b border-border py-4 text-center text-text-sub ${bodyText}`}
                >
                  내역이 없습니다.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td className={`border-b border-border p-3 text-center text-text ${bodyText}`}>
                    {parseInt(row.date.split("-")[2], 10)}일
                  </td>
                  <td className={`border-b border-border p-3 text-center text-text ${bodyText}`}>
                    {TYPE_LABEL[row.recordType]}
                  </td>
                  <td
                    className={`border-b border-border p-3 text-center font-medium ${bodyText} ${
                      row.recordType === "INCOME"
                        ? "text-secondary"
                        : "text-primary"
                    }`}
                  >
                    {row.cost.toLocaleString()}원
                  </td>
                  <td className={`border-b border-border p-3 text-center text-text ${bodyText}`}>
                    {row.description}
                  </td>
                  <td className="border-b border-border p-3 text-center">
                    <EditModal row={row} />
                  </td>
                  <td className="border-b border-border p-3 text-center">
                    <DeleteRecordButton id={row.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
