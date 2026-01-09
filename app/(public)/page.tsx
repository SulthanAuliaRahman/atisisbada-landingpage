import LandingCarousel from "@/app/(public)/LandingCarousel";
import LandingModule from "@/app/(public)/LandingModule";
import LandingFaqs from "@/app/(public)/LandingFAQs";


// this is landing page
export default function LandingPage() {
  return (
    <div className="max-h-screen bg-white overflow-x-hidden">
      {/* per-section */}
      <main>
        <LandingCarousel/>
        <LandingModule/>
        <LandingFaqs/>
      </main>
      
    </div>
  );
}
