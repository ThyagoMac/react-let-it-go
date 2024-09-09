import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

type Props = {
  children: ReactNode;
};

export const Template = ({ children }: Props) => {
  return (
    <div className="">
      <Header />
      <main className="max-w-screen-xl mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
};
