import Footer from "@/components/homeLayout/Footer";
import Navbar from "@/components/homeLayout/NavBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function AuthLayout({ children }) {
  const session = await getServerSession();

  if (session) {
    redirect("/deposit");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex bg-background">{children}</div>
      <Footer />
    </div>
  );
}

export default AuthLayout;
