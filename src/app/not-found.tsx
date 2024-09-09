import { PageTitle } from "@/components/layout-component/PageTitle";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="">
      <PageTitle>Pagina nao encontrada!!!</PageTitle>
      <p>Nao encontramos uma pagina</p>
      <Link href="/" className="mb-3 underline">
        Voltar a pagina principal
      </Link>
    </div>
  );
}
