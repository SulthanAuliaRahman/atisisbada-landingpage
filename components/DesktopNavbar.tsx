import Image from "next/image";

type NavItem = {
  name: string;
  href: string;
};

interface DesktopNavProps {
  navItems: NavItem[];
  onCtaClick: () => void;
}

const DesktopNav = ({ navItems, onCtaClick }: DesktopNavProps) => {
  return (
    <>
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 font-bold text-xl">
        <Image
          src="/globe.svg"
          alt="Atisisbada Logo"
          width={24}
          height={24}
          priority
        />
        <span>Atisisbada</span>
      </a>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>

      {/*  Kontak Kami Button */}
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
