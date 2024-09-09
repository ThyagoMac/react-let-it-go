import { mockCategories } from "@/mock/mock";
import { apiFetchGet } from "./LoginService";

const BASEAPI = "http://alunos.b7web.com.br:501";

export const getCategories = async () => {
  const jump = 1;

  if (jump === 1) {
    return mockCategories;
  }

  const json = await apiFetchGet("/categories");

  return json.categories;
};
