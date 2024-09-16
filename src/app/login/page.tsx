"use client";

import { Checkbox } from "@/components/inputs/Checkbox";
import { TextInput } from "@/components/inputs/TextInput";
import { PageTitle } from "@/components/layout-component/PageTitle";
import { doLogin } from "@/helpers/AuthHandler";
import { login } from "@/services/LoginService";
import { LoginType } from "@/types/LoginTypes";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginType>({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ email: "", password: "" });

    try {
      const json = await login({ email, password });
      if (json.hasOwnProperty(errors)) {
        setErrors({ ...errors, ...json.errors });
        return;
      }
      doLogin(json.token, rememberMe);
      window.location.href = "/";
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <PageTitle>Login</PageTitle>
      <div className="flex justify-center items-center">
        <form
          className="bg-gray-900 border rounded-md px-7 pb-7 pt-3 max-w-2xl shadow-md"
          onSubmit={handleSubmit}
        >
          <TextInput
            label="E-mail"
            type="email"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />

          <TextInput
            label="Senha"
            type="password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
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
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
