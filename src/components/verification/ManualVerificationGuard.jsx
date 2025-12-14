"use client";

import { useSelector } from "react-redux";
import ManualVerification from "./ManualVerification";
import VerificationApproved from "./VerificationApproved";
import VerificationPending from "./VerificationPending";
import VerificationRejected from "./VerificationRejected";

function ManualVerificationGuard() {
  const { user } = useSelector((state) => state.user);

  const verification_status = user?.verificationStatus;
  return (
    <>
      {verification_status === "PENDING" ? (
        <VerificationPending />
      ) : verification_status === "VERIFIED" ? (
        <VerificationApproved />
      ) : verification_status === "REJECTED" ? (
        <VerificationRejected />
      ) : (
        <ManualVerification />
      )}
    </>
  );
}

export default ManualVerificationGuard;
