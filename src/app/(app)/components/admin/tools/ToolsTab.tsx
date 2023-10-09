"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from "clsx";

const ToolsTab = () => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    if (pathname === "/admin/tools/user_search")
      setCurrentTab("Users");
    else if (pathname === "/admin/tools/coupons")
      setCurrentTab("Coupons");
    else if (pathname === "/admin/tools/search_coupon")
      setCurrentTab("Search Coupon");
    else if (pathname === "/admin/tools/slot_transactions")
      setCurrentTab("Slots");
    else if (pathname === "/admin/tools/casino_transactions")
      setCurrentTab("Casino");
    else if (pathname === "/admin/tools/bet_types")
      setCurrentTab("Bet Types");
    else if (pathname === "/admin/tools/league")
      setCurrentTab("League");
  }, [pathname])

  return (
    <>
      <p className="text-lg text-white bg-brand-title p-4">Tools - {currentTab}</p>
      <section className="text-sm font-medium text-center text-white bg-brand-title">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <Link
              href="/admin/tools/user_search"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/user_search" ? "border-white border-b-4" : ""
              )}
            >
              User Search
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/coupons"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/coupons"
                  ? "border-white border-b-4"
                  : ""
              )}
            >
              Coupons
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/search_coupon"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/search_coupon" ? "border-white border-b-4" : ""
              )}
            >
              Search Coupon
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/slot_transactions"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/slot_transactions" ? "border-white border-b-4" : ""
              )}
            >
              Slot Transactions
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/casino_transactions"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/casino_transactions" ? "border-white border-b-4" : ""
              )}
            >
              Casino Transactions
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/bet_types"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/bet_types" ? "border-white border-b-4" : ""
              )}
            >
              Bet Types
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/league"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/league" ? "border-white border-b-4" : ""
              )}
            >
              League
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default ToolsTab;
