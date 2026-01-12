"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/admin");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <p className="text-center mt-8">
        Loading...
      </p>
    );
  }

  if (!session?.user) {
    return (
      <p className="text-center mt-8">
        Redirecting...
      </p>
    );
  }

  return <>{children}</>;
}
