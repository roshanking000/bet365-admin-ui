"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useModalContext } from "@/contexts/ModalContext";
import {
  getUsersByQuery,
  getUserById,
  getUsersCreatedBy,
} from "@/api/userManagement";
import CountriesTable from "@/app/(app)/components/admin/tools/Countries/CountryTable";
import Pagination from "@/components/ui/Pagination";

const Countries = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { openTranslateModal } = useModalContext();

  const [sport, setSport] = useState("Football");

  const [searchList, setSearchList] = useState(search_list);
  const [pageTotalCount, setPageTotalCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="flex justify-between items-end">
        <div className="flex flex-col">
          <p className="text-sm text-white">Sport:</p>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
            onChange={(e) => setSport(e.target.value)}
          >
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Table Tennis">Table Tennis</option>
            <option value="Handball">Handball</option>
            <option value="Futsal">Futsal</option>
            <option value="Ice Hockey">Ice Hockey</option>
          </select>
        </div>
        <button
          type="button"
          className="px-4 py-1.5 bg-green-700 hover:bg-green-600 text-brand-button-text hover:text-white"
          onClick={() => router.push("/admin/tools/country_groups")}
        >
          Country Groups
        </button>
      </section>
      <CountriesTable tableList={searchList} currentPage={currentPage} />
      <div className="flex flex-row justify-center">
        <Pagination
          pageCount={pageTotalCount}
          gotoPage={(page: number) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};

export default Countries;

const search_list = [
  {
    id: 527,
    name: "Europe",
    order: 10,
    group: "Internationals"
  },
  {
    id: 243,
    name: "England",
    order: 20,
    group: "No Group"
  },
  {
    id: 161,
    name: "Germany",
    order: 30,
    group: "No Group"
  },
  {
    id: 147,
    name: "France",
    order: 40,
    group: "No Group"
  },
  {
    id: 142,
    name: "Spain",
    order: 50,
    group: "No Group"
  },
  {
    id: 215,
    name: "Italy",
    order: 60,
    group: "No Group"
  },
  {
    id: 48,
    name: "Greece",
    order: 70,
    group: "No Group"
  },
];
