import { config } from "@/config";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";
import Button from "../libs/Button";
import Typography from "../libs/Typography";

const WelcomeModal = ({ onStartTour, onSkip }) => {
  const { generalData } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-90 bg-black/70 overflow-auto p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl max-w-md w-full ">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-br from-primary-dark to-primary-light text-white px-4 md:px-8 pt-12 pb-8 text-center relative rounded-t-2xl">
          {/* Animated background shapes */}
          <div className="absolute top-4 left-4 size-12 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute bottom-4 right-4 size-8 bg-white/15 rounded-full animate-bounce" />
          <div className="absolute top-1/2 right-8 size-6 bg-white/10 rounded-full animate-pulse delay-1000" />

          <div className="relative z-10">
            <div className="mb-4 flex justify-center items-center">
              {generalData?.site_logo_dark && (
                <Image
                  src={config.fileBaseUrl + generalData?.site_logo_dark}
                  width={200}
                  height={100}
                  alt="Logo"
                />
              )}
            </div>
            <Typography variant="h3" align="center">
              Welcome {user?.name}!
            </Typography>
            <Typography variant="body2" align="center">
              Let's get you started
            </Typography>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6 bg-gray-100 rounded-b-2xl">
          <div className="text-center mb-8">
            <Typography
              variant="h4"
              align="center"
              color="black"
              className="mb-3"
            >
              Ready to explore?
            </Typography>
            <Typography variant="body2" align="center" color="gray">
              We've designed an amazing experience just for you. Take a quick
              tour to discover all the powerful features that will help you work
              smarter.
            </Typography>
          </div>

          {/* Features preview */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="size-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <div className="size-6 bg-blue-500 rounded"></div>
              </div>
              <Typography variant="caption">Organize</Typography>
            </div>
            <div className="text-center">
              <div className="size-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <div className="size-6 bg-green-500 rounded-full"></div>
              </div>
              <Typography variant="caption">Collaborate</Typography>
            </div>
            <div className="text-center">
              <div className="size-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <div className="size-6 bg-purple-500 rounded-lg transform rotate-45"></div>
              </div>
              <Typography variant="caption">Achieve</Typography>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              variant="contain"
              size="lg"
              onClick={onStartTour}
              className="w-full "
            >
              <FaPlay size={18} className="text-white/80" />
              Start Site Tour
              <BsArrowRight className="animate-bounce-right" size={20} />
            </Button>

            <Button
              variant="outline"
              onClick={onSkip}
              className="w-full !text-primary-darker mb-4"
            >
              Skip for now
            </Button>
          </div>

          <Typography variant="caption">
            You can always access the tour later from the help menu
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
