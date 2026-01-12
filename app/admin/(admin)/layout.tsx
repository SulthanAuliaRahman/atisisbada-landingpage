import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/AdminSidebar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar/>
        <main>
          <div className="container flex justify-center">
              {children}
          </div>
        </main>
      </div>
    </AdminGuard>
    </>
  );
}
