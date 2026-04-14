"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { subtitleText } from "@/constants/typography";
import { useSearchParams } from "next/navigation";
import { useYearRecords } from "@/queries/record/record.query";
import { useMemo } from "react";
import { RecordItem } from "@/types/record/record.type";
import { RECORD_BACK_KEYS, RECORD_FRONT_KEYS } from "@/constants/record";

const MONTH_LABELS = Array.from({ length: 12 }, (_, i) => i + 1);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function YearlyGraph() {
  const searchParams = useSearchParams();
  const year = searchParams?.get("selectYear");
  const { data: yearRecords = [] } = useYearRecords(Number(year));

  const monthStats = useMemo(() => {
    const stats: Record<number, { income: number; expense: number }> = {};

    for (let i = 1; i <= 12; i++) {
      stats[i] = { income: 0, expense: 0 };
    }

    yearRecords.forEach((record: RecordItem) => {
      const month = new Date(record.date).getMonth() + 1;
      if (!Number.isFinite(month) || month < 1 || month > 12) {
        return;
      }

      if (record.recordType === RECORD_BACK_KEYS.INCOME) {
        stats[month].income += Number(record.cost) || 0;
      } else {
        stats[month].expense += Number(record.cost) || 0;
      }
    });

    return stats;
  }, [yearRecords]);

  const totalGraphData = useMemo(
    () => ({
      labels: MONTH_LABELS.map((month) => `${month}월`),
      datasets: [
        {
          label: RECORD_FRONT_KEYS.INCOME,
          data: MONTH_LABELS.map((month) => monthStats[month]?.income || 0),
          backgroundColor: "#3ad29f",
        },
        {
          label: RECORD_FRONT_KEYS.EXPENSE,
          data: MONTH_LABELS.map((month) => monthStats[month]?.expense || 0),
          backgroundColor: "#5b5fc7",
        },
      ],
    }),
    [monthStats],
  );

  return (
    <div className="rounded-[1.2rem] bg-surface px-6 pb-8 pt-6">
      <div className={`${subtitleText} mb-[0.7rem] text-text`}>
        월별 수입/지출 그래프
      </div>
      <div className="min-h-104 w-full bg-transparent">
        <Bar
          data={
            totalGraphData ?? {
              labels: [],
              datasets: [],
            }
          }
          options={{
            plugins: { legend: { display: true } },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `${value} 원`,
                },
              },
              x: {
                title: {
                  display: true,
                },
              },
            },
          }}
          height={260}
        />
      </div>
    </div>
  );
}
