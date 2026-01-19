import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/AdminSidebar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    // </AdminGuard>
  );
}
