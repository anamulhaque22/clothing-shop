import MainNav from "@/components/Navbar/MainNav";
import Footer from "@/components/Shared/Footer";

export default function LayoutWithHeaderFooter({ children }) {
  return (
    <>
      <MainNav />
      {children}
      <Footer />
    </>
  );
}
