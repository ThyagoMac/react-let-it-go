import { LoginType, RegisterType } from "@/types/LoginTypes";
import Cookies from "js-cookie";

const BASEAPI = "http://alunos.b7web.com.br:501";

export const apiFetchPost = async (endpoint: string, body: any) => {
  if (!body.token) {
    let token = Cookies.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/login";
  }

  return json;
};

export const apiFetchGet = async (endpoint: string, body: any = null) => {
  if (body && !body.token) {
    let token = Cookies.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(`${BASEAPI + endpoint}?${body}`);

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/login";
  }

  return json;
};

export const login = async ({ email, password }: LoginType) => {
  //prevent API//{prevent API
  if (email) {
    let token = Cookies.get("token");
    if (!token) {
      token = "tokenPipi2";
    }
    return { email, password, token };
  }
  //} prevent API
  const json = await apiFetchPost("/user/signin", { email, password });
  return json;
};

export const register = async ({
  name,
  email,
  stateLocation,
  password,
}: RegisterType) => {
  //{prevent API
  if (email) {
    let token = Cookies.get("token");
    if (!token) {
      token = "tokenPipi2";
    }
    return {
      name,
      email,
      stateLocation,
      password,
    };
  }
  //} prevent API
  const json = await apiFetchPost("/user/signin", {
    name,
    email,
    stateLocation,
    password,
  });
  return json;
};
