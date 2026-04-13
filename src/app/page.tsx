import { useMemo } from "react";
import { bodyText, subtitleText, titleText } from "../constants/typography";
import Link from "next/link";
import ROUTE_KEYS from "@/constants/route";

type FunctionTextBoxProps = {
  order: string;
  title: string;
  content: string;
};

export default function Home() {
  const textBoxList: FunctionTextBoxProps[] = [
    {
      order: "첫번째",
      title: "대시보드 요약",
      content:
        "기간별 총수입 · 지출 · 순이익을 집계하여\n핵심 재정 상태를 파악할 수 있습니다.",
    },
    {
      order: "두번째",
      title: "수입 · 지출 내역 관리",
      content:
        "연 · 월별 카테고리 · 금액 · 사유 · 날짜를\n 기록하여 자산을 관리할 수 있습니다.",
    },
    {
      order: "세번째",
      title: "분석 보고서",
      content:
        "연 · 월별 총수입 · 지출 · 순이익 분석으로 더 나은 소비 방향을 제공합니다.",
    },
  ];

  const functionTextBox = useMemo(() => {
    return ({ order, title, content }: FunctionTextBoxProps) => (
      <div
        key={title}
        className="flex flex-col gap-4 rounded-[1.2rem] border border-border bg-surface p-8"
      >
        <div className={`${bodyText} text-primary`}>{order}</div>
        <div className="flex flex-col gap-2">
          <h3 className={`${subtitleText} m-0 text-text`}>{title}</h3>
          <p
            className={`${bodyText} m-[0.3rem_0_0] whitespace-pre-line leading-[1.6] text-text-sub`}
          >
            {content}
          </p>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="flex w-full flex-col gap-16 px-8 pb-16 pt-12 text-text max-[1024px]:px-6 max-[512px]:px-4">
      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-3 rounded-[1.6rem] border border-border bg-surface px-6 pb-12 pt-16">
          <h1 className={`${titleText} m-auto text-text`}>
            당신의 하우스 헬퍼
          </h1>
          <p className={`${subtitleText} m-auto text-text-sub`}>
            청년을 위한 자산 관리 서비스
          </p>
          <Link
            href={ROUTE_KEYS.SIGNIN}
            className={`${bodyText} m-auto mt-[0.8rem] w-fit cursor-pointer rounded-2xl border-none bg-primary px-[1.2rem] py-[0.7rem] text-text transition-colors duration-200 hover:bg-secondary hover:text-surface`}
          >
            시작하기
          </Link>
        </section>

        <p
          className={`${bodyText} m-0 rounded-[1.2rem] border border-border bg-surface px-[1.1rem] py-4 text-center leading-[1.7] text-text-sub`}
        >
          이 서비스는 청년들이 자신의 자산을 체계적으로 관리하기 어렵고 소비
          패턴을 파악하기 힘든 문제를 해결하기 위한 서비스입니다.
        </p>
      </div>

      <section className="mt-4 flex flex-col gap-8">
        <div className={`${titleText} m-0 text-center text-text`}>주요기능</div>
        <div className="grid grid-cols-3 gap-8 max-[90rem]:grid-cols-1">
          {textBoxList.map((item) => functionTextBox(item))}
        </div>
      </section>
    </div>
  );
}
