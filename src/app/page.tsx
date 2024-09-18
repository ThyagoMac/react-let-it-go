"use client";

import { TextInput } from "@/components/inputs/TextInput";
import { getStates } from "@/services/StatesService";
import { useEffect, useState } from "react";
import { CategoryListType } from "../types/Category";
import { StateListType } from "../types/States";
import { getCategories } from "@/services/CategoryService";
import Link from "next/link";
import Image from "next/image";
import { getAds } from "@/services/AdsService";
import { PageTitle } from "@/components/layout-component/PageTitle";
import { AdsType } from "@/types/AdsTypes";
import { AdItem } from "@/components/ad/AdItem";

export default function Home() {
  const [categoriesList, setCategoriesList] = useState<CategoryListType>([]);
  const [recentAdsList, setRecentAdsList] = useState<AdsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stateList, setStateList] = useState<StateListType>([]);

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

  return (
    <div className="">
      <div className="search-area bg-lime-700 py-6 px-4 rounded-md shadow-md">
        <form className="search-box flex gap-3" method="GET" action="/ads">
          <TextInput
            className="flex-1"
            name="search"
            placeholder="O que esta procurando?"
            disabled={isLoading}
          />
          <label className="area">
            <div className="area--title font-bold"></div>
            <div className="area--input">
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="state"
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

          <button
            className="py-2 px-3 rounded-md bg-blue-700 hover:bg-blue-600 transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
            disabled={isLoading}
            type="submit"
          >
            Pesquisar
          </button>
        </form>
        <div className="category-list flex flex-wrap justify-between gap-7 mt-5">
          {categoriesList.map((category) => (
            <Link
              key={category.img}
              className={`category-item flex gap-2 items-center w-1/5 hover:scale-105 hover:font-bold transition-all`}
              href={`/ads?category=${category.name}`}
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
            </Link>
          ))}
        </div>
      </div>
      <div className="search-area">
        <PageTitle>Anuncios Recentes</PageTitle>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3">
          {recentAdsList.map((ad) => (
            <AdItem className="" key={ad.id} data={ad} />
          ))}
        </div>
        <Link className="font-bold my-4 block" href={`/ads`}>
          Ver todos
        </Link>
        <hr className="my-4" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, cumque.
          Similique, a quibusdam autem eaque ipsum voluptatem, possimus dolores
          cumque officiis illum modi voluptas esse vel provident fuga optio
          quos.
        </p>
      </div>
    </div>
  );
}
