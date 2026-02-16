import DetailItemBase from "@/components/client/detail-item/DetailItemBase";
import DetailMitra from "@/components/client/detail-item/DetailMitra";

type Props = { params: Promise<{ id: string }> };

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return <DetailItemBase id={id} variant="mitra" />;
};

export default Page;
