"use client";

import { useState } from "react";
import { LayoutDashboard, Layers, Users, Settings, Package } from "lucide-react";
import DesktopAdminSidebar from "./admin/DesktopAdminSidebar";
import MobileAdminSidebar from "./admin/MobileSidebar";

export const adminNavItems = [
  { name: "FAQs", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Fitur", href: "/admin/fitur", icon: Layers },
  { name: "Modul", href: "/admin/modul", icon: Package },
  { name: "Mitra", href: "/admin/mitra", icon: Users },
  { name: "Portofolio", href: "/admin/portofolio", icon: Settings },
  { name: "Carousel", href: "/admin/profil", icon: Settings },
  { name: "pengaturan", href: "/admin/pengaturan", icon: Users },
  { name: "Footer", href: "/admin/footer", icon: Settings },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DesktopAdminSidebar navItems={adminNavItems} />

      <MobileAdminSidebar
        navItems={adminNavItems}
        isOpen={open}
        onToggle={() => setOpen((v) => !v)}
      />
    </>
  );
}
