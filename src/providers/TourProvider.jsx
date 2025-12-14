"use client";
import WelcomeModal from "@/components/dashboarLayout/WelcomeModal";
import { toggleSideBar } from "@/store/slices/settings";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const TourContext = createContext();

export function TourProvider({ children }) {
  const driverRef = useRef(null);
  const [showTour, setShowTour] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    driverRef.current = driver({
      showProgress: true,
      allowClose: false,
      overlayClickNext: false,
      allowKeyboardControl: true,
      showButtons: ["next"],
      onPopoverRender: (popover, {}) => {
        const skipBtn = document.createElement("button");
        skipBtn.innerText = "Skip";
        skipBtn.className =
          "px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300";
        skipBtn.onclick = () => driverRef.current?.destroy();

        // Find the navigation container inside the footer
        const navContainer = popover.footer.querySelector(
          ".driver-popover-navigation-btns"
        );

        // Insert Skip button at the beginning of that container
        if (navContainer) {
          navContainer.insertBefore(skipBtn, navContainer.firstChild);
        }
      },
      steps: [
        {
          element: ".step-toggle-sidebar",
          popover: {
            title: "Collapse and Expand Sidebar",
            description:
              "Use this button to toggle the sidebar for quick access to your dashboard.",
          },
        },
        {
          element: ".step-earning-money",
          popover: {
            title: "Your Earnings Balance",
            description:
              "This is your total earnings from completed tasks and freelance work on Workdear and ready for withdrawal.",
          },
        },
        {
          element: ".step-deposit-money",
          popover: {
            title: "Your Deposit Balance",
            description:
              "This is remaining deposit balance that you can use to make payments to your employers.",
          },
        },
        {
          element: ".step-notification-button",
          popover: {
            title: "Quick Notifications",
            description:
              "Use this button to access your notifications and stay updated on job activity, messages, and system updates.",
          },
        },
        {
          element: ".step-profile-button",
          popover: {
            title: "Profile Section",
            description:
              "Here you can view your profile details, manage your account settings, update your profile picture and withdraw your earnings.",
          },
        },
        {
          element: ".step-find-job",
          popover: {
            title: "Find Jobs",
            description:
              "Browse thousands of job opportunities that match your skills and preferences.",
          },
          onHighlightStarted: () => {
            dispatch(toggleSideBar(true));
          },
        },
        {
          element: ".step-purchase-package",
          popover: {
            title: "Purchase Package",
            description:
              "Upgrade your account with premium packages to unlock more features and visibility.",
          },
        },
        {
          element: ".step-post-job",
          popover: {
            title: "Post Your Own Job",
            description:
              "Easily create and publish a job post to hire the right talent for your project.",
          },
        },
        {
          element: ".step-my-work",
          popover: {
            title: "My Work",
            description:
              "Track and manage all the tasks or projects you’ve completed here.",
          },
        },
        {
          element: ".step-my-job",
          popover: {
            title: "My Jobs",
            description:
              "View and manage all the jobs you have posted or applied to in one place.",
          },
        },
        {
          element: ".step-notification",
          popover: {
            title: "Notifications",
            description:
              "Stay updated with alerts about job activity, messages, and system updates.",
          },
        },
        {
          element: ".step-deposit",
          popover: {
            title: "Deposit Balance",
            description:
              "Securely add funds to your wallet for job postings, packages, or services.",
          },
        },
        {
          element: ".step-share-earn",
          popover: {
            title: "Share & Earn",
            description:
              "Invite friends using your referral link and earn rewards when they join.",
          },
        },
        {
          element: ".step-transaction",
          popover: {
            title: "Transaction History",
            description:
              "Review all your deposits, withdrawals, and payments in detail.",
          },
        },
        {
          element: ".step-advertisement",
          popover: {
            title: "Advertisement",
            description:
              "Promote your services or offers by posting advertisements here.",
          },
        },
        {
          element: ".step-tickets",
          popover: {
            title: "Tickets",
            description:
              "Purchase draw tickets to participate in upcoming prize events.",
          },
        },
        {
          element: ".step-play-and-earn",
          popover: {
            title: "Play & Earn",
            description:
              "Have fun with games like spin-the-wheel and win exciting rewards instantly.",
          },
        },
      ],
    });

    // Run tour only first time
    if (!localStorage.getItem("tour_done")) {
      localStorage.setItem("tour_done", "true");
      setShowTour(true);
    }
  }, []);

  const startTour = () => {
    setShowTour(false);
    if (driverRef.current) {
      driverRef.current.drive();
    } else {
      toast.info("Unable to start tour");
    }
  };

  return (
    <TourContext.Provider value={{ startTour }}>
      {children}
      {showTour && (
        <WelcomeModal
          onStartTour={startTour}
          onSkip={() => setShowTour(false)}
        />
      )}
    </TourContext.Provider>
  );
}

export const useTour = () => useContext(TourContext);
