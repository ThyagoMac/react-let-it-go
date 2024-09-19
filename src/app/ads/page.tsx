"use client";

import { AdItem } from "@/components/ad/AdItem";
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
import { useEffect, useRef, useState } from "react";

export default function Ads() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [categoriesList, setCategoriesList] = useState<CategoryListType>([]);
  const [adsList, setAdsList] = useState<AdsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stateList, setStateList] = useState<StateListType>([]);
  const [querySearch, setQuerySearch] = useState<string>(
    searchParams.get("search") || ""
  );
  const [queryState, setQueryState] = useState<string>(
    searchParams.get("state") || ""
  );
  const [queryCategory, setQueryCategory] = useState<string>(
    searchParams.get("category") || ""
  );

  useEffect(() => {
    setIsLoading(true);
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

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      getAddsList();
    }, 1200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querySearch, queryState, queryCategory]);

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

  const handleCategoryClick = (category: string) => {
    if (category === queryCategory) {
      setQueryCategory("");
      return;
    }
    setQueryCategory(category);
  };

  const getAddsList = async () => {
    setIsLoading(true);
    const adsList = await getAds({
      sort: "desc",
      limit: 9,
      querySearch,
      queryState,
      queryCategory,
    });
    setIsLoading(false);
    setAdsList(adsList);
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
        <div className="right-side flex-1">
          <h2 className="font-bold text-2xl">Resultados</h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 ${
              isLoading ? "opacity-40" : "opacity-100"
            }`}
          >
            {adsList.map((ad) => (
              <AdItem className="" key={ad.id} data={ad} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
