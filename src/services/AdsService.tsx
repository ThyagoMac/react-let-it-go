import { apiFetchGet } from "./LoginService";
import { mockAdsList } from "@/mock/mock";

const BASEAPI = "http://alunos.b7web.com.br:501";

export const getAds = async (options: any) => {
  const jump = 1;

  if (jump === 1) {
    return mockAdsList;
  }

  const json = await apiFetchGet(`/ad/list`, options);

  return json.categories;
};

export const getAdInfo = async (id: string, other: boolean = false) => {
  const jump = 1;

  if (jump === 1) {
    let finalResult = mockAdsList.filter((ad) => ad.id === id)[0];
    finalResult.others = mockAdsList.slice(0, 4);
    return finalResult;
  }

  const json = await apiFetchGet(`/ad/item`, { id, other });

  return json.categories;
};
