import { mockStates } from "@/mock/mock";
import { apiFetchGet } from "./LoginService";

const BASEAPI = "http://alunos.b7web.com.br:501";

export const getStates = async () => {
  const jump = 1;

  if (jump === 1) {
    return mockStates;
  }

  const json = await apiFetchGet("/states");

  return json.states;
};
