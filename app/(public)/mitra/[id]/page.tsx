import DetailItem from "@/components/client/DetailItem";

type Props = { params: Promise<{ id: string }> };

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return <DetailItem id={id} />;
};

export default Page;
