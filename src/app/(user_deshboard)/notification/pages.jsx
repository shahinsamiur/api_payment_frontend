"use client";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import Card from "@/components/libs/Card";
import Pagination from "@/components/libs/Pagination";
import Typography from "@/components/libs/Typography";
import { useGetNotificationQuery } from "@/store/features/notification";
import clsx from "clsx";
import { useState } from "react";
import { HiUserCircle } from "react-icons/hi";

export default function Notification() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetNotificationQuery({
    status: "",
    page: page,
  });
  const notifications = data?.data?.data;

  return (
    <Card>
      <div className="flex flex-col justify-center items-center">
        <Typography variant="h4" color="primary">
          Latest Notification
        </Typography>
        <Typography variant="body2" color="gray">
          60 days older notifications will be deleted.
        </Typography>
      </div>

      <div>
        {isLoading ? (
          <LoadingIndicator />
        ) : notifications?.length ? (
          notifications.map((data, index) => (
            <NotificationItem key={index} data={data} />
          ))
        ) : (
          <Typography variant="body2" align="center">
            No notification found
          </Typography>
        )}
      </div>

      <Pagination
        currentPage={page}
        onPageChange={(value) => setPage(value)}
        totalPages={data?.data?.last_page || 1}
      />
    </Card>
  );
}

function NotificationItem({ data }) {
  const wrapperClass = clsx(
    "flex flex-col md:flex-row px-3 py-2 lg:py-3 lg:px-5 rounded-lg  justify-between cursor-pointer gap-2 hover:translate-x-2 transition-all duration-300",
    {
      "dark:text-white dark:bg-transparent": data.status === "READ",
      "bg-primary-dark text-white my-1": data.status !== "READ",
    }
  );

  return (
    <div className={wrapperClass}>
      <div className="flex gap-2">
        <div>
          <HiUserCircle className="text-xl lg:text-3xl" />
        </div>
        <Typography variant="body1">{data.message}</Typography>
      </div>
      <Typography variant="body2" align="right" className="text-nowrap">
        {new Date(data.created_at).toLocaleDateString("EN-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </Typography>
    </div>
  );
}
