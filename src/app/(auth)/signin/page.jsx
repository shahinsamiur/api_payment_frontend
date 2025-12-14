import Typography from "@/components/libs/Typography";
import SignInForm from "@/components/signin/SignInForm";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex-1 container mx-auto px-3 md:px-5  flex items-center flex-col lg:flex-row pb-18 pt-24 md:py-24 justify-center gap-5 md:gap-10">
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
