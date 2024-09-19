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
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { off } from "process";
import { useEffect, useRef, useState } from "react";

export default function Ads() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [categoriesList, setCategoriesList] = useState<CategoryListType>([]);
  const [adsList, setAdsList] = useState<AdsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stateList, setStateList] = useState<StateListType>([]);
  const [totalAdsList, setTotalAdsList] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageCountNumbers, setPageCountNumbers] = useState<number[]>([1]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
      setCurrentPage(1);
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

  useEffect(() => {
    if (adsList.length > 0) {
      const finalCount = Math.ceil(totalAdsList / itemsPerPage);
      const finalNumbers = Array.from({ length: finalCount }, (_, i) => i + 1);
      setPageCount(finalCount);
      setPageCountNumbers(finalNumbers);
      return;
    }
    setPageCount(0);
    setPageCountNumbers([1]);
  }, [totalAdsList, adsList, itemsPerPage]);

  useEffect(() => {
    getAddsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleCategoryClick = (category: string) => {
    if (category === queryCategory) {
      setQueryCategory("");
      return;
    }
    setQueryCategory(category);
  };

  const getAddsList = async () => {
    setIsLoading(true);
    let offset = 0;
    offset = (currentPage - 1) * itemsPerPage;

    const res = await getAds({
      sort: "desc",
      limit: itemsPerPage,
      offset: offset,
      querySearch,
      queryState,
      queryCategory,
    });

    setIsLoading(false);
    setAdsList(res.data);
    setTotalAdsList(res.total);
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
          <div className="my-5 text-center h-6">
            {isLoading && <span>Carregando ...</span>}
            {!isLoading && adsList.length === 0 && (
              <span>Nenhum anuncio encontrado</span>
            )}
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 ${
              isLoading ? "opacity-40" : "opacity-100"
            }`}
          >
            {adsList.map((ad) => (
              <AdItem className="" key={ad.id} data={ad} />
            ))}
          </div>
          <div className="my-5 flex flex-row gap-2 items-center justify-center">
            {pageCountNumbers.map((number, index) => (
              <div
                key={index}
                className={`py-2 px-3 text-xs cursor-pointer rounded-sm
                  ${
                    number === currentPage
                      ? "bg-zinc-300 font-bold text-black"
                      : "hover:bg-zinc-300 hover:font-bold hover:text-black"
                  }
                `}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
