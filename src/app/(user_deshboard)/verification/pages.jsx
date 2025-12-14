import InstantVerification from "@/components/verification/InstantVerification";
import ManualVerificationGuard from "@/components/verification/ManualVerificationGuard";

export default function Verification() {
  return (
    <div className="space-y-4">
      <InstantVerification />
      <ManualVerificationGuard />
    </div>
  );
}
