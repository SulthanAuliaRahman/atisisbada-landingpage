import ItemPage from "@/components/page/ItemPage";
import LandingFAQsWrapper from "@/components/server/LandingFAQs.server";
import InstagramSection from "@/components/server/InstagramSection.server";

export default function Page() {
  return (
    <div>
      <ItemPage type="MODUL" />
      <InstagramSection/>
      <LandingFAQsWrapper/>
    </div>
  );
}

