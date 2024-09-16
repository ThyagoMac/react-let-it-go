"use client";

import { Checkbox } from "@/components/inputs/Checkbox";
import { TextInput } from "@/components/inputs/TextInput";
import { PageTitle } from "@/components/layout-component/PageTitle";
import { doLogin } from "@/helpers/AuthHandler";
import { register } from "@/services/LoginService";
import { getStates } from "@/services/StatesService";
import { useEffect, useState } from "react";
import { StateListType } from "../../types/States";
import { LoginType } from "@/types/LoginTypes";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stateLocation, setStateLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginType>({
    email: "",
    password: "",
    name: "",
    stateLocation: "",
  });
  const [stateList, setStateList] = useState<StateListType>([]);

  useEffect(() => {
    const fetchStates = async () => {
      const sList = await getStates();
      setStateList(sList);
    };

    fetchStates();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
      name: "",
      stateLocation: "",
    });
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        password: "Senhas estao diferentes",
      });

      setIsLoading(false);
      return;
    }

    try {
      const json = await register({
        name,
        email,
        stateLocation,
        password,
      });

      if (json.hasOwnProperty(errors)) {
        setErrors({ ...errors, ...json.errors });
        return;
      }

      doLogin(json.token, rememberMe);
      window.location.href = "/";
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <PageTitle>Criar nova conta</PageTitle>
      <div className="flex justify-center items-center">
        <form
          className="bg-gray-900 border rounded-md px-7 pb-7 pt-3 max-w-2xl shadow-md"
          onSubmit={handleSubmit}
        >
          <TextInput
            label="Nome Completo"
            disabled={isLoading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />
          <TextInput
            label="E-mail"
            type="email"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />
          <label className="area">
            <div className="area--title font-bold my-3">Estado</div>
            <div className="area--input">
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
                value={stateLocation}
                onChange={(e) => setStateLocation(e.target.value)}
              >
                <option value=""></option>
                {stateList.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.text}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <TextInput
            label="Senha"
            type="password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />
          <TextInput
            label="Confirme sua Senha"
            type="password"
            disabled={isLoading}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Checkbox
            label="Mantenha logado"
            disabled={isLoading}
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <button
            className="w-full py-2 px-3 rounded-md bg-blue-700 hover:bg-blue-600 transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
            disabled={isLoading}
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
