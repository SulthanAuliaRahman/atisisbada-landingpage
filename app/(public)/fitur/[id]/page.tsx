import DetailItemBase from "@/components/client/detail-item/DetailItemBase";
import DetailFiturModul from "@/components/client/detail-item/DetailFiturModul";

type Props = { params: Promise<{ id: string }> };

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return <DetailItemBase id={id} variant="fimod" />;
};

export default Page;
