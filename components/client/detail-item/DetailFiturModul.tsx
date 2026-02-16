import { Item } from "@/lib/type/Item";

type Props = {
  item: Item;
  first: string;
};

const DetailFiturModul = ({ item, first }: Props) => {
  return (
    <section className="relative min-h-[420px] px-6 pt-40 sm:pt-44 lg:pt-48 pb-16 sm:pb-20 bg-item-bg overflow-hidden text-white flex flex-col items-center justify-center">
      {" "}
      <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 bg-white/30 rounded-full blur-3xl" />{" "}
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-72 h-72 bg-white/25 rounded-full blur-3xl" />{" "}
      {/* HALF CIRCLE */}{" "}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        {" "}
        <div className="relative w-40 h-28 sm:w-56 sm:h-40 md:w-72 md:h-56 lg:w-[560px] lg:h-[380px] bg-white rounded-b-full shadow-[0_12px_30px_rgba(0,0,0,0.25)] ">
          {" "}
          {/* Icon */}{" "}
          <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 translate-y-1/2">
            {" "}
            <img
              src={item.ikon}
              alt={item.nama}
              className=" w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain "
            />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-15 z-10">
        {" "}
        {item.type.charAt(0).toUpperCase() +
          item.type.slice(1).toLowerCase()}{" "}
      </h1>{" "}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-2 z-10">
        {" "}
        {item.nama
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}{" "}
      </h1>{" "}
      <div className="flex items-center justify-center gap-3 mt-8 z-10">
        {" "}
        <div className="h-[3px] w-3 bg-white" />{" "}
        <div className="h-[3px] w-10 bg-white" />{" "}
        <div className="h-[3px] w-3 bg-white" />{" "}
      </div>{" "}
      {first && (
        <div className="mt-10 w-full flex justify-center">
          {" "}
          <div className="w-full max-w-[900px] px-6 text-justify text-white/90">
            {" "}
            <div
              className="prose prose-invert max-w-none [&>*]:text-justify"
              dangerouslySetInnerHTML={{ __html: first }}
            />{" "}
          </div>{" "}
        </div>
      )}{" "}
    </section>
  );
};

export default DetailFiturModul;
