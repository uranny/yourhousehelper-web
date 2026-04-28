import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ReportItem } from "@/types/report/report.type";
import { titleText, bodyText } from "@/constants/typography";

interface ReportDetailProps {
  report: ReportItem;
}

export default function ReportDetail({ report }: ReportDetailProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/report" className={`${bodyText} text-primary hover:text-secondary font-semibold`}>
          ← 뒤로가기
        </Link>
      </div>

      <div className="bg-surface rounded-lg p-8 shadow-sm border border-border">
        <h1 className={`${titleText} text-text mb-2`}>{report.title}</h1>
        <p className={`${bodyText} text-text-sub mb-6`}>
          {report.startDate} ~ {report.endDate}
        </p>

        <div className={`prose prose-sm max-w-none text-text ${bodyText}`}>
          <ReactMarkdown>{report.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
