"use client";

import { TextInput } from "@/components/inputs/TextInput";
import { PageTitle } from "@/components/layout-component/PageTitle";
import { getAds } from "@/services/AdsService";
import { getCategories } from "@/services/CategoryService";
import { getStates } from "@/services/StatesService";
import { AdsType } from "@/types/AdsTypes";
import { CategoryListType } from "@/types/Category";
import { StateListType } from "@/types/States";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Ads() {
  const [categoriesList, setCategoriesList] = useState<CategoryListType>([]);
  const [recentAdsList, setRecentAdsList] = useState<AdsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stateList, setStateList] = useState<StateListType>([]);

  const searchParams = useSearchParams();
  const [querySearch, setQuerySearch] = useState<string>(
    searchParams.get("search") || ""
  );
  const [queryState, setQueryState] = useState<string>(
    searchParams.get("state") || ""
  );
  const [queryCategory, setQueryCategory] = useState<string>(
    searchParams.get("category") || ""
  );

  const pathName = usePathname();

  const router = useRouter();

  useEffect(() => {
    let queryArr: string[] = [];
    if (querySearch) {
      queryArr.push(`search=${querySearch}`);
    }
    if (queryState) {
      queryArr.push(`state=${queryState}`);
    }
    if (queryCategory) {
      queryArr.push(`category=${queryCategory}`);
    }

    const queryes = queryArr.join("&");

    const finalPath = `${pathName}?${queryes}`;

    router.replace(finalPath);
  }, [querySearch, queryState, queryCategory, pathName, router]);

  useEffect(() => {
    const fetchStates = async () => {
      const sList = await getStates();
      setStateList(sList);
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const catList = await getCategories();
      setCategoriesList(catList);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecentAds = async () => {
      const recentAdsList = await getAds({
        sort: "desc",
        limit: 8,
      });
      setRecentAdsList(recentAdsList);
    };

    fetchRecentAds();
  }, []);

  const handleCategoryClick = (category: string) => {
    if (category === queryCategory) {
      setQueryCategory("");
      return;
    }
    setQueryCategory(category);
  };

  return (
    <div className="">
      <PageTitle>Anuncios</PageTitle>
      <div className="flex flex-col md:flex-row gap-3">
        <aside className="left-side w-64">
          <form method="GET">
            <TextInput
              className="flex-1"
              name="search"
              placeholder="O que esta procurando?"
              value={querySearch}
              onChange={(e) => setQuerySearch(e.target.value)}
            />

            <label className="area">
              <div className="area--title font-bold my-3">Estado</div>
              <div className="area--input">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  name="state"
                  value={queryState}
                  onChange={(e) => setQueryState(e.target.value)}
                >
                  <option value="">Selecione um estado</option>
                  {stateList.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.text}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <div className="area">
              <div className="area--title font-bold my-3">Categoria</div>

              <ul>
                {categoriesList.map((category) => (
                  <li
                    key={category.img}
                    className={` mb-1 p-2 category-item flex gap-2 items-center rounded-md cursor-pointer transition-all
                      ${
                        category.name === queryCategory
                          ? "bg-zinc-300 font-bold text-black"
                          : "hover:bg-zinc-300 hover:font-bold hover:text-black"
                      }
                    `}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div
                      className={`bg-gray-200 ${category.bg} p-2 rounded-full w-max`}
                    >
                      <Image
                        className=""
                        src={category.img}
                        alt={category.name}
                        width={25}
                        height={25}
                      />
                    </div>
                    <span>{category.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </aside>
        <div className="right-side flex-1 bg-green-400">page</div>
      </div>
    </div>
  );
}
