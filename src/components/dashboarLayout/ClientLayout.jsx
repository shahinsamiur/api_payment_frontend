"use client";

import Ads from "@/components/dashboarLayout/Ads";
import DashboardSideBar from "@/components/dashboarLayout/DashboardSideBar/DashboardSideBar";
import Footer from "@/components/dashboarLayout/Footer";
import { TourProvider } from "@/providers/TourProvider";
import { useSelector } from "react-redux";
import LoadingIndicator from "../common/LoadingIndicator";
import MaintananceMode from "../common/MaintananceMode";
import DashboardHeader from "./dashboardHeader/DashboardHeader";

function ClientLayout({ children }) {
  const { generalData } = useSelector((state) => state.settings);
  const { user, loading } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);

  if (!token) {
    return <LoadingIndicator fullScreen />;
  }

  if (generalData?.site_maintenance_mode) {
    return <MaintananceMode text={generalData?.site_maintenance_message} />;
  }

  return (
    <TourProvider>
      <div className="flex min-h-screen bg-background">
        <nav aria-label="Dashboard-navigation" className="relative">
          <DashboardSideBar />
        </nav>
        <div className="relative grow min-h-screen flex flex-col">
          <DashboardHeader />
          {!loading && !user?.is_premium && (
            <div className="relative z-10">
              <Ads />
            </div>
          )}
          <main className="relative flex-1 z-50 pt-5 container mx-auto px-3 md:px-5 flex flex-col justify-between">
            {children}

            <Footer />
          </main>
        </div>
      </div>
    </TourProvider>
  );
}

export default ClientLayout;
