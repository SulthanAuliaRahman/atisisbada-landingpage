"use client";

import { useState, useEffect } from "react";
import DesktopNav from "./DesktopNavbar";
import MobileNav from "./MobileNavbar";

const navItems = [
  { name: "Home",     href: "/" },
  { name: "Profil",   href: "/profil" },
  { name: "Fitur",    href: "/fitur" },
  { name: "Modul",    href: "/modul" },
  { name: "Mitra",    href: "/mitra" },
];

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    fetch("/api/admin/footer")
      .then((res) => res.json())
      .then((data) => {
        setWhatsapp(data.whatsapp || "");
      })
      .catch(() => {});
  }, []);

   const handleCtaClick = () => {
    if (!whatsapp) return;

    const phone = whatsapp.replace(/\D/g, "");
    const url = `https://wa.me/${phone}`;

    window.open(url, "_blank");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background py-5">
      <div className="container max-w-[1700px] flex items-center justify-between">
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
