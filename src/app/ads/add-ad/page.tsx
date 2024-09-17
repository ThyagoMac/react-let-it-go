"use client";

import { Checkbox } from "@/components/inputs/Checkbox";
import { MoneyInput } from "@/components/inputs/MoneyInput";
import { TextAreaInput } from "@/components/inputs/TextAreaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { PageTitle } from "@/components/layout-component/PageTitle";
import { addAd } from "@/services/AdsService";
import { getCategories } from "@/services/CategoryService";
import { AddAdErrorType } from "@/types/AdsTypes";
import { CategoryListType } from "@/types/Category";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AddAd() {
  const [categoriesList, setCategoriesList] = useState<CategoryListType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("0");
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesc] = useState("");

  const fileField = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState<AddAdErrorType>({
    mainErr: "",
    title: "",
    category: "",
    price: "",
    priceNegotiable: "",
    desc: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const catList = await getCategories();
      setCategoriesList(catList);
    };

    fetchCategories();
  }, []);

  const hasErrors = (currentErr: AddAdErrorType) => {
    const hasErrors = Object.values(currentErr).some((value) => value !== "");
    return hasErrors;
  };

  const checkErrors = () => {
    let currentErr: AddAdErrorType = {
      title: "",
      category: "",
      price: "",
      priceNegotiable: "",
      desc: "",
    };

    if (!title.trim()) {
      currentErr = { ...currentErr, title: "sem titulo" };
    }
    if (!price.trim()) {
      currentErr = { ...currentErr, price: "sem preço" };
    }
    if (!desc.trim()) {
      currentErr = { ...currentErr, desc: "sem descriçao" };
    }

    return currentErr;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const currentErr: AddAdErrorType = checkErrors();

    if (hasErrors(currentErr)) {
      setTimeout(() => {
        setErrors(currentErr);
        setIsLoading(false);
      }, 500);
      return;
    }

    setErrors(currentErr);

    const fData = new FormData();
    fData.append("title", title);
    fData.append("category", category);
    fData.append("price", price);
    fData.append("priceNegotiable", String(priceNegotiable));
    fData.append("desc", desc);

    const files = fileField.current?.files;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        fData.append("img", files[i]);
      }
    }

    const json = await addAd(fData);

    if (!json.error) {
      router.push(`/ads/${json.id}`);
    }

    const apiErr: AddAdErrorType = { ...currentErr, mainErr: json.error };

    setTimeout(() => {
      setErrors(apiErr);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="">
      <PageTitle>Adicionar anuncio</PageTitle>
      {errors.mainErr && (
        <p className="text-center w-fit m-auto my-4 bg-red-300 rounded-md py-2 px-5 border border-red-500 text-white">
          {errors.mainErr}
        </p>
      )}
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
          />
          <label className="area">
            <div className="area--title font-bold my-3">Categoria</div>
            <div className="area--input">
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Selecione uma opçao</option>
                {categoriesList &&
                  categoriesList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </label>

          <MoneyInput
            label="Preço"
            placeholder="R$"
            disabled={isLoading}
            onChange={(e) => setPrice(e.target.value)}
            error={errors.price}
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
          />

          <label className="area ">
            <div className="area--title font-bold my-3">
              Imagens (1 ou mais)
            </div>
            <div className="area--input">
              <input
                type="file"
                disabled={isLoading}
                ref={fileField}
                multiple
              />
            </div>
          </label>

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
