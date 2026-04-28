import Link from "next/link";
import { ReportItem } from "@/types/report/report.type";
import { subtitleText, bodyText } from "@/constants/typography";

interface ReportCardProps {
  report: ReportItem;
}

export default function ReportCard({ report }: ReportCardProps) {
  const dateRangeText = `${report.startDate} ~ ${report.endDate}`;

  return (
    <Link href={`/report/${report.id}`}>
      <div className="p-4 border border-border bg-surface rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className={`${bodyText} text-text mb-2`}>
          {report.title}
        </h3>
        <p className={`${bodyText} text-text-sub`}>{dateRangeText}</p>
      </div>
    </Link>
  );
}
