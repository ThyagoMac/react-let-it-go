import { AdsType } from "@/types/AdsTypes";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: AdsType;
  className?: string;
};

export const AdItem = ({ data, className }: Props) => {
  let finalPrice = "Preço Negociavel";

  if (!data.priceNegotiable) {
    finalPrice = `R${data.price.toFixed(2)}`;
  }

  return (
    <Link
      href={`/ads/${data.id}`}
      className={`${className} flex flex-col gap-3 shadow-sm rounded-md p-3 border border-transparent hover:border-gray-300 hover:scale-105 hover:font-bold transition-all`}
    >
      <div className="h-48 w-48 md:w-full">
        <Image
          className="h-full w-full object-cover"
          src={data.src}
          alt={data.title}
          width={144}
          height={144}
        />
      </div>
      <div className="flex-1">{data.title}</div>
      <div className="text-xl">{finalPrice}</div>
    </Link>
  );
};
