import ItemPage from "@/components/page/ItemPage";
import LandingFAQsWrapper from "@/components/server/LandingFAQs.server";

export default function Page() {
  return (
    <div>
      <ItemPage type="MODUL" />
      <LandingFAQsWrapper/>
    </div>
  );
}

