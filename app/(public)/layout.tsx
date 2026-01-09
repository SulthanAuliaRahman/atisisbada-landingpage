import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "./LandingFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar/>
      <main>{children}</main>
      <LandingFooter/>
    </>
  );
}
