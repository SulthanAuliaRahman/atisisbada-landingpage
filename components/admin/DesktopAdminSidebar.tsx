"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

interface Props {
  navItems: NavItem[];
}

export default function DesktopAdminSidebar({ navItems }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-background">
      {/* Logo */}
      <div className="px-6 py-5 font-bold text-lg">
        Admin Panel
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
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

      {/* Footer (Log out) */}
      {session?.user && (
        <div className="border-t px-4 py-4">
          <p className="mb-2 text-xs text-muted-foreground">
            {session.user.name}
          </p>
          <p className="mb-3 text-sm font-medium truncate">
            {session.user.email}
          </p>

          <button
            onClick={async () => {
              await signOut();
              router.push("/admin");
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      )}
    </aside>
  );
}

