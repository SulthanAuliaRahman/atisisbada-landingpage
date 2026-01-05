import Navbar from "@/components/LandingNavbar";
import LandingCarousel from "@/components/LandingCarousel";
import LandingModule from "@/components/LandingModule";
import LandingFaqs from "@/components/LandingFAQs";
import LandingFooterSection from "@/components/LandingFooter";
import ThemeToggle from "@/components/ThemeToggle";



// this is landing page
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* per-section */}
      <Navbar/>

      <main>
        <LandingCarousel/>
        <LandingModule/>
        <LandingFaqs/>
      </main>

      <LandingFooterSection/>

      {/* Floating theme toggle */}
      <ThemeToggle/>
      
    </div>
  );
}
