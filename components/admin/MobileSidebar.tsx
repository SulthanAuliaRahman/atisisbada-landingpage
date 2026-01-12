"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"

import { LogOut } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
;

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

interface Props {
  navItems: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileAdminSidebar({
  navItems,
  isOpen,
  onToggle,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      {/* Toggle button */}
      <button onClick={onToggle} className="md:hidden p-2">
        {isOpen ? <X /> : <Menu />}
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur md:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <aside className="h-full w-64 border-r p-4 flex flex-col">
          <div className="mb-6 font-bold text-lg">
            Admin Panel
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onToggle}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-muted"
                  )}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sign out */}
          {session?.user && (
            <button
              onClick={async () => {
                await signOut();
                onToggle();
                router.push("/admin");
              }}
              className="mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          )}
        </aside>
      </div>
    </>
  );
}

