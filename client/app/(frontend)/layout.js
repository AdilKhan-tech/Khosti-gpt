import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";

export default function FrontendLayout({ children }) {
  return (
    <div className="min-h-dvh bg-[#031017] text-[#f4f7f5]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
