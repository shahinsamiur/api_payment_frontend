"use client";
import Card from "@/components/libs/Card";
import Pagination from "@/components/libs/Pagination";
import TransactionHistoryHeader from "@/components/transaction-history/TransactionHistoryHeader";
import TransactionList from "@/components/transaction-history/TransactionList";
import { useGetWithdrawTransactionHistoryQuery } from "@/store/features/payment";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const { data, isLoading } = useGetWithdrawTransactionHistoryQuery({
    page,
    status,
  });

  return (
    <Card className="!space-y-5">
      <TransactionHistoryHeader
        status={status}
        setStatus={setStatus}
        title="Withdraw History"
      />
      <TransactionList data={data} isLoading={isLoading} />

      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={data?.meta?.last_page || 1}
      />
    </Card>
  );
}
