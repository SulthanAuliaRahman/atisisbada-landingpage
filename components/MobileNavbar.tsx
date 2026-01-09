import { Menu, X } from "lucide-react";
import Link from "next/link";

type NavItem = {
  name: string;
  href: string;
};

interface MobileNavProps {
  navItems: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  onCtaClick: () => void;
}

const MobileNav = ({
  navItems,
  isOpen,
  onToggle,
  onCtaClick,
}: MobileNavProps) => {
  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={onToggle}
        className="md:hidden p-2 text-foreground z-50"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center
          bg-background/95 backdrop-blur transition-all duration-300 md:hidden
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col items-center gap-8 text-xl">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors"
              onClick={onToggle}
            >
              {item.name}
            </Link>
          ))}

          <button
            className="regular-button mt-6"
            onClick={() => {
              onCtaClick();
              onToggle();
            }}
          >
            Kontak Kami
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
