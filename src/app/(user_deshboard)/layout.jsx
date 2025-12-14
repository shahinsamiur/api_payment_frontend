import ClientLayout from "@/components/dashboarLayout/ClientLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function UserDeshboardLayout({ children }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  return <ClientLayout>{children}</ClientLayout>;
}

export default UserDeshboardLayout;
