import { Item } from "@/lib/type/Item";

type Props = {
  item: Item;
  first: string;
};

const DetailMitra = ({ item, first }: Props) => {
  return (
    <div className="w-full">
      <div className="relative bg-white pt-26 pb-24 sm:pb-32 md:pb-40 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 text-black">
          {item.nama}
        </h1>

        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-20">
          <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-white rounded-full flex items-center justify-center">
            <img
              src={item.ikon}
              alt={item.nama}
              className="w-32 h-32 sm:w-44 sm:h-44 md:w-60 md:h-60 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="bg-item-bg pt-40 pb-20 px-6 text-white text-center">
        {first && (
          <div className="max-w-[900px] mx-auto text-white/90">
            <div
              className="prose prose-invert max-w-none text-justify"
              dangerouslySetInnerHTML={{ __html: first }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailMitra;
