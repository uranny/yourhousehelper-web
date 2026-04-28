"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import ROUTE_KEYS from "../../../constants/route";
import { bodyText } from "../../../constants/typography";
import { useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const menuItems = [
    {
      label: "대시 보드",
      href: ROUTE_KEYS.DASHBOARD + `?selectYear=${currentYear}`,
      activeLink: ROUTE_KEYS.DASHBOARD,
    },
    {
      label: "수입 · 지출 관리",
      href:
        ROUTE_KEYS.RECORD +
        `?selectYear=${currentYear}` +
        `&selectMonth=${currentMonth}`,
      activeLink: ROUTE_KEYS.RECORD,
    },
    {
      label: "분석 보고서",
      href: ROUTE_KEYS.REPORT,
      activeLink: ROUTE_KEYS.REPORT,
    },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-surface px-0 py-2 text-text">
      <div className="mx-80 my-4 flex flex-row items-center justify-between max-[1024px]:mx-[1.6rem]">
        <Link
          href={ROUTE_KEYS.ROOT}
          className={`${bodyText} border-none text-left text-text no-underline outline-none`}
        >
          당신의 <span className="text-primary">하우스 헬퍼</span>
        </Link>

        <nav
          className="m-0 flex list-none flex-row items-center gap-16 p-0 max-[1024px]:gap-12 max-[512px]:gap-8"
          aria-label="메인 메뉴"
        >
          {menuItems.map((item) => {
            const isActive = (pathname ?? "").startsWith(item.activeLink);
            console.log("isActive:", item.label, isActive)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${bodyText} flex cursor-pointer items-center justify-center border-b-[0.2rem] bg-transparent text-center no-underline outline-none transition-[background,color,border-color] duration-150 ${
                  isActive
                    ? "border-b-primary text-primary"
                    : "border-b-transparent text-text hover:border-b-primary hover:bg-surface hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={ROUTE_KEYS.SIGNIN}
          className={`${bodyText} flex cursor-pointer items-center justify-center border-b-[0.2rem] border-b-transparent bg-transparent text-center text-text no-underline outline-none transition-[background,color,border-color] duration-150 hover:border-b-primary hover:bg-surface hover:text-primary ${pathname === ROUTE_KEYS.SIGNIN ? "border-b-primary text-primary" : ""}`}
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
