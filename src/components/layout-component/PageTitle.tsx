import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const PageTitle = ({ children }: Props) => {
  return <h1 className="mt-5 mb-10 text-3xl font-bold">{children}</h1>;
};
