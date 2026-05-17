import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#03045E] font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
