'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  href: string;
};

interface DesktopNavProps {
  navItems: NavItem[];
  onCtaClick: () => void;
}

const DesktopNav = ({ navItems, onCtaClick }: DesktopNavProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <Image
          src="/globe.svg"
          alt="Atisisbada Logo"
          width={24}
          height={24}
          priority
        />
        <span>Atisisbada</span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "relative font-medium transition-colors",
                  isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                )}
              >
                {item.name}

                {/* underline indicator */}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-primary rounded-full" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Kontak Kami Button */}
      <div className="hidden md:block">
        <button
          className="regular-button"
          onClick={onCtaClick}
        >
          Kontak Kami
        </button>
      </div>
    </>
  );
};

export default DesktopNav;
