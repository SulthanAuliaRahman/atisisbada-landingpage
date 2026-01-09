export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {/* TODO: */}
    {/* <AdminSideBar/> */}
      <main>
        {children}
        </main>
    </>
  );
}
