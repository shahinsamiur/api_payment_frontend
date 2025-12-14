"use client";

import LoadingIndicator from "@/components/common/LoadingIndicator";
import Markque from "@/components/common/Markque";
import NoTicketAvailable from "@/components/ticket/NoTicketAvailable";
import TicketData from "@/components/ticket/TicketData";
import { useGetTicketQuery } from "@/store/features/ticket";

export default function page() {
  const { data, isLoading } = useGetTicketQuery();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!data) {
    return <NoTicketAvailable />;
  }

  return (
    <div>
      <Markque />
      <TicketData data={data} />
    </div>
  );
}
