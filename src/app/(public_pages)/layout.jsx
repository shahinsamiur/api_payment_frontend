import MaintananceMode from "@/components/common/MaintananceMode";
import Footer from "@/components/homeLayout/Footer";
import NavBar from "@/components/homeLayout/NavBar";
import { getGeneralData } from "@/services/general/GeneralFetcher";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Layout({ children }) {
  const data = await getGeneralData();
  const session = await getServerSession();
  if (session) {
    redirect("/deposit");
  }

  if (data?.site_maintenance_mode) {
    return <MaintananceMode text={data?.site_maintenance_message} />;
  }

  return (
    <div className="bg-background min min-h-screen flex flex-col">
      <NavBar />
      <div className="grow relative overflow-hidden">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
