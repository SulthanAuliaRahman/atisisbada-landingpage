import ItemPage from "@/components/page/ItemPage";
import InstagramSection from "@/components/server/InstagramSection.server";
import LandingFAQsWrapper from "@/components/server/LandingFAQs.server";

export const revalidate = 10;

export default function Page() {
  return (
    <div className="bg-backgrounnd overflow-x-hidden">
      <ItemPage type="FITUR" />
      <InstagramSection/>
      <LandingFAQsWrapper/>
    </div>
  );
}
