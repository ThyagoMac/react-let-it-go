"use client";

import { Checkbox } from "@/components/inputs/Checkbox";
import { TextAreaInput } from "@/components/inputs/TextAreaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { PageTitle } from "@/components/layout-component/PageTitle";
import { AddAdErrorType } from "@/types/AdsTypes";
import { useState } from "react";

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

export default function AddAd() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesc] = useState("");

  const [errors, setErrors] = useState<AddAdErrorType>({
    title: "",
    category: "",
    price: "",
    priceNegotiable: "",
    desc: "",
  });

  return (
    <div className="">
      <PageTitle>Adicionar anuncio</PageTitle>
      <div className="flex justify-center items-center">
        <form
          className="bg-gray-900 border rounded-md px-7 pb-7 pt-3 max-w-2xl shadow-md"
          onSubmit={handleSubmit}
        >
          <TextInput
            label="Titulo"
            type="text"
            disabled={isLoading}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            required
          />

          <TextInput
            label="Categoria"
            type="text"
            disabled={isLoading}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            error={errors.category}
            required
          />
          <TextInput
            label="Preço"
            type="text"
            disabled={isLoading}
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            error={errors.price}
            required
          />
          <Checkbox
            label="Preço Negociavel?"
            disabled={isLoading}
            checked={priceNegotiable}
            onChange={(e) => setPriceNegotiable(e.target.checked)}
          />
          <TextAreaInput
            label="Description"
            rows={3}
            disabled={isLoading}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            error={errors.desc}
            required
          />

          <button
            className="w-full mt-8 py-2 px-3 rounded-md bg-blue-700 hover:bg-blue-600 transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
            disabled={isLoading}
            type="submit"
          >
            Adicionar Anuncio
          </button>
        </form>
      </div>
    </div>
  );
}
