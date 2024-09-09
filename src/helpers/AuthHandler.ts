import Cookies from "js-cookie";

export const isLogged = (): boolean => {
  let token = Cookies.get("token");
  return token ? true : false;
};

export const doLogin = (token: string, rememberMe: boolean = false) => {
  if (rememberMe) {
    Cookies.set("token", token, { expires: 1 });
    return;
  }
  Cookies.set("token", token);
};

export const doLogout = () => {
  Cookies.remove("token");
};
