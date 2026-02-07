import ItemPage from "@/components/page/ItemPage";
import InstagramSection from "@/components/server/InstagramSection.server";
import LandingFAQsWrapper from "@/components/server/LandingFAQs.server";

export default function Page() {
  return (
    <div>
      <ItemPage type="FITUR" />
      <InstagramSection/>
      <LandingFAQsWrapper/>
    </div>
  );
}
