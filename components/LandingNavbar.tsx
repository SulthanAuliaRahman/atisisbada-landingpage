"use client";

import { useState } from "react";
import DesktopNav from "./DesktopNavbar";
import MobileNav from "./MobileNavbar";

const navItems = [
  { name: "Profil",     href: "/" },
  { name: "Fitur",      href: "/fitur" },
  { name: "Modul",      href: "/modul" },
  { name: "Mitra",      href: "/mitra" },
  { name: "Portofolio", href: "/portofolio" },
];

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCtaClick = () => {
    console.log("Contanct button clicked");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background py-5">
      <div className="container flex items-center justify-between">

        <DesktopNav
          navItems={navItems}
          onCtaClick={handleCtaClick}
        />

        <MobileNav
          navItems={navItems}
          isOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen((v) => !v)}
          onCtaClick={handleCtaClick}
        />
      </div>
    </nav>
  );
};

export default LandingNavbar;
