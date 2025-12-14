import { CiBellOn } from "react-icons/ci";
import { RiHistoryFill } from "react-icons/ri";
import { TiTicket } from "react-icons/ti";
import Button from "../libs/Button";
import Typography from "../libs/Typography";

export default function NoTicketAvailable() {
  return (
    <div className="relative mx-auto mt-10">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 size-40 dark:bg-white/5 rounded-full blur-xl animate-pulse" />
      <div
        className="absolute -bottom-16 right-0 lg:-right-16 size-32 dark:bg-white/10 rounded-full blur-lg animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Main content container */}
      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-5 md:p-12 shadow-2xl border border-white/20 max-w-md w-full text-center">
        {/* Animated ticket icon */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-r dark:from-white/20 to-transparent rounded-full blur-xl animate-pulse" />
          <div className="relative bg-gray-200 dark:bg-white/20 p-6 rounded-full backdrop-blur-sm">
            <TiTicket
              className="size-12 dark:text-white/90 animate-bounce"
              style={{ animationDuration: "2s" }}
            />
          </div>
        </div>

        {/* Main heading */}
        <Typography variant="h4" align="center">
          Currently No Ticket
          <br />
          Available
        </Typography>

        {/* Subtitle */}
        <Typography variant="caption" className="font-medium">
          All tickets are currently sold out. Please check back later or join
          our notification list.
        </Typography>

        {/* Action buttons */}
        <div className="space-y-4 mt-5">
          <Button variant="outline" className="w-full justify-start">
            <CiBellOn className="w-5 h-5" />
            Notify Me When Available
          </Button>

          <Button variant="contain" className="w-full justify-start">
            <RiHistoryFill className="w-5 h-5" />
            View Previous Events
          </Button>
        </div>

        {/* Status indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="size-2 bg-red-400 rounded-full animate-pulse" />
          <Typography variant="caption">Sold Out</Typography>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full animate-ping" />
      <div
        className="absolute bottom-8 left-8 w-2 h-2 bg-white/40 rounded-full animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute top-16 left-4 w-1 h-1 bg-white/50 rounded-full animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  );
}
