import Typography from "@/components/libs/Typography";
import Link from "next/link";
import Icon404 from "../components/icons/Icon404";
import Button from "../components/libs/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center gap-5 justify-center bg-background">
      <Icon404 className="size-40 text-primary-dark" />

      <Typography variant="h2">Page Not Found</Typography>
      <Typography variant="body2">
        Sorry, the page you are looking for does not exist.
      </Typography>

      <Link href="/jobs">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
}
