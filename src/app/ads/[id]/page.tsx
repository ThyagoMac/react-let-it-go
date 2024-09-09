"use client";

import { AdItem } from "@/components/ad/AdItem";
import NextBreadcrumb from "@/components/Breadcrumb";
import { PageTitle } from "@/components/layout-component/PageTitle";
import { getAdInfo } from "@/services/AdsService";
import { AdsType } from "@/types/AdsTypes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Ad({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [adInfo, setAdInfo] = useState<AdsType | null>(null);

  useEffect(() => {
    const fetchAdInfo = async () => {
      const json = await getAdInfo(params.id, true);
      setAdInfo(json);

      setIsLoading(false);
    };

    fetchAdInfo();
  }, [params.id]);

  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0"); // Adiciona 0 à esquerda se necessário
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses em JavaScript são baseados em 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  let finalPrice = "Negociavel";

  if (!adInfo?.priceNegotiable) {
    finalPrice = `R$: ${adInfo?.price.toFixed(2)}`;
  }

  return (
    <div>
      {!isLoading && (
        <>
          <NextBreadcrumb
            homeElement={"Home"}
            separator={<span> / </span>}
            activeClasses="text-blue-500"
            containerClasses="flex my-2"
            listClasses="hover:underline mx-2 font-bold"
            capitalizeLinks
          />
          <PageTitle>{adInfo?.title}</PageTitle>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 border border-gray-300 rounded-md shadow-md flex">
              <div className="h-80 w-80">
                {adInfo && (
                  <Image
                    className="h-full w-full object-cover"
                    src={adInfo?.src}
                    alt={adInfo?.title}
                    width={320}
                    height={320}
                  />
                )}
              </div>
              <div className="p-4 flex flex-col gap-4 flex-1">
                <h2 className="text-xl font-bold">{adInfo?.title}</h2>
                <div className="flex-1">{adInfo?.text}</div>
                <hr />
                <div className="text-xs opacity-80">
                  {adInfo?.dateCreated && (
                    <div>Criado em {formatDate(adInfo?.dateCreated)}</div>
                  )}
                  Visualizaçoes: {adInfo?.views}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:w-64 ">
              <div className="p-4 border border-gray-300 rounded-md shadow-md">
                Preço
                <span className="block text-xl font-bold">{finalPrice}</span>
              </div>
              <div>
                <a
                  href={adInfo?.src}
                  target="_blank"
                  className="w-full block text-center py-2 px-3 rounded-md bg-blue-700 hover:bg-blue-600 transition-all disabled:bg-gray-600 cursor-pointer disabled:cursor-not-allowed"
                >
                  Fale com o vendedor
                </a>
              </div>
              <div className="flex flex-col gap-2 p-4 border border-gray-300 rounded-md shadow-md">
                <div className="text-lg font-bold">Vendedor</div>
                <div className=" ">Nome do vendedor</div>
                <div className=" opacity-80">email do vendedor</div>
                <div className=" opacity-80">Estado: {adInfo?.state}</div>
              </div>
            </div>
          </div>
          {adInfo?.others && (
            <>
              <h2 className="text-xl font-bold mt-10">
                Outras oferdas do vendedor
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 mt-5">
                {adInfo.others.map((item) => (
                  <AdItem key={item.id} data={item} />
                ))}
              </div>
            </>
          )}
        </>
      )}
      {isLoading && <>loading..</>}
    </div>
  );
}
