import Image from "next/image";

interface PengembangCardProps {
  img_url: string;
  nama: string;
  jabatan: string;
}

const PengembangCard = ({ img_url, nama, jabatan }: PengembangCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden transition hover:shadow-xl hover:-translate-y-1 duration-300">
      
      {/* Image */}
      <div className="relative w-full h-60">
        <Image
          src={img_url}
          alt={nama}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 text-left">
        <h4 className="font-semibold text-base">{nama}</h4>
        <p className="text-sm text-secondary mt-1">{jabatan}</p>
      </div>
    </div>
  );
};

export default PengembangCard;