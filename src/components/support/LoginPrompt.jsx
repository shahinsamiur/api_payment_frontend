import Link from "next/link";
import Button from "../libs/Button";
import Typography from "../libs/Typography";

export default function LoginPrompt() {
  return (
    <div className="flex-1 px-4 py-3 flex flex-col gap-1.5 items-center justify-center">
      <Typography variant="body1">Please log in to start chatting.</Typography>
      <Link href="/signin">
        <Button>Log In</Button>
      </Link>
    </div>
  );
}
