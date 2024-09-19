import { apiFetchGet } from "./LoginService";
import { mockAdsList } from "@/mock/mock";
import Cookies from "js-cookie";

const BASEAPI = "http://alunos.b7web.com.br:501";

const apiFetchFile = async (endpoint: string, body: FormData) => {
  if (!body.has("token")) {
    const token = Cookies.get("token");
    if (token) {
      body.append("token", token);
    }
  }
  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    body,
  });
  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

export const getAds = async (options: any) => {
  const jump = 1;

  let offset = options.offset || 0;
  let limit = options.limit || 10;

  if (jump === 1) {
    let list = [...mockAdsList];

    list = list.splice(offset, limit);

    return { data: list, total: mockAdsList.length };
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

export const addAd = async (fData: FormData) => {
  const jump = 1;

  if (jump === 1) {
    let finalResult = mockAdsList[mockAdsList.length - 1];
    return finalResult;
  }

  const json = await apiFetchFile("/ad/add", fData);
  return json;
};
