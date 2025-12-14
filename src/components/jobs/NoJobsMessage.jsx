import { FaSearch } from "react-icons/fa";
import Button from "../libs/Button";
import Typography from "../libs/Typography";

export default function NoJobsMessage() {
  return (
    <div className="relative mt-10">
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4">
        <div className="text-center transform transition-all duration-1000">
          {/* Main Message */}
          <Typography variant="h2" align="center">
            No Jobs Available
          </Typography>

          {/* Subtitle */}
          <Typography variant="body2" color="gray" align="center">
            Currently no opportunities match your criteria
          </Typography>

          {/* Decorative Elements */}
          <div className="flex items-center justify-center space-x-4 my-8">
            <div className="w-20 h-1 bg-gradient-to-r from-primary-lighter/10 dark:from-transparent via-primary-light dark:via-emerald-400 dark:to-transparent to-primary-lighter/10 rounded-full" />
            <div className="w-3 h-3 bg-primary-dark dark:bg-emerald-400 rounded-full animate-pulse" />
            <div className="w-20 h-1 bg-gradient-to-r from-primary-lighter/10 dark:from-transparent via-primary-dark dark:via-emerald-400 dark:to-transparent to-primary-lighter/10 rounded-full" />
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Typography variant="body2" align="center">
              New opportunities are added regularly
            </Typography>
            <div className="flex justify-center">
              <Button variant="contain">
                <FaSearch />
                Check Back Soon
              </Button>
            </div>
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center items-center space-x-2 mt-12">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="size-3 bg-primary-lighter rounded-full animate-bounce"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
