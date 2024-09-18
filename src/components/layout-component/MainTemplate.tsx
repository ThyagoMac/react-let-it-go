import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

type Props = {
  children: ReactNode;
};

export const Template = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-screen-xl p-4 flex-1 min-w-full">{children}</main>
      <Footer />
    </div>
  );
};
