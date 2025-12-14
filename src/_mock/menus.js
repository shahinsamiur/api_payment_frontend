import { BiSupport } from "react-icons/bi";
import {
  FaBuysellads,
  FaCreditCard,
  FaHome,
  FaNetworkWired,
  FaSearch,
  FaTelegramPlane,
  FaTrophy,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GoTasklist } from "react-icons/go";
import { GrTask, GrTransaction, GrUserWorker } from "react-icons/gr";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { IoIosWallet, IoMdNotifications } from "react-icons/io";
import { IoShareSocial, IoStar, IoTicket } from "react-icons/io5";
import { MdOutlineWork, MdVerifiedUser, MdWorkHistory } from "react-icons/md";
import { PiUserCheckFill } from "react-icons/pi";
import { RiAdvertisementFill } from "react-icons/ri";
import { SiTask } from "react-icons/si";
import { menus } from "./paths";

export const dashboardMenuItems = [
  // {
  //   label: "Home",
  //   icon: <FaHome />,
  //   path: menus.home,
  //   hideOnVerified: false,
  //   disabledOnNotVerified: false,
  // },
  // {
  //   label: "Verify now",
  //   icon: <MdVerifiedUser />,
  //   path: menus.verification,
  //   hideOnVerified: true,
  //   disabledOnNotVerified: false,
  // },
  // {
  //   label: "Find Jobs",
  //   icon: <FaSearch />,
  //   path: menus.jobs,
  //   hideOnVerified: false,
  //   disabledOnNotVerified: false,
  //   className: "step-find-job",
  // },
  // {
  //   label: "Premium",
  //   icon: <IoStar />,
  //   path: menus.premium,
  //   hideOnVerified: false,
  //   disabledOnNotVerified: false,
  //   className: "step-purchase-package",
  // },
  // {
  //   label: "Post New Job",
  //   icon: <FaNetworkWired />,
  //   path: menus.postJob,
  //   hideOnVerified: false,
  //   disabledOnNotVerified: false,
  //   className: "step-post-job",
  // },
  // {
  //   label: "My work",
  //   icon: <SiTask />,
  //   path: null,
  //   hideOnVerified: false,
  //   disabledOnNotVerified: false,
  //   className: "step-my-work",
  //   subMenus: [
  //     {
  //       label: "All Task",
  //       icon: <GoTasklist />,
  //       path: menus.myWork,
  //     },
  //     {
  //       label: "Accepted Task",
  //       icon: <GrTask />,
  //       path: menus.acceptedTask,
  //     },
  //   ],
  // },
  // {
  //   label: "My Jobs",
  //   icon: <MdOutlineWork />,
  //   path: menus.myJobs,
  //   hideOnVerified: false,
  //   disabledOnNotVerified: false,
  //   className: "step-my-job",
  // },
  // {
  //   label: "Notification",
  //   icon: <IoMdNotifications />,
  //   path: menus.notification,
  //   hideOnVerified: false,
  //   disabledOnNotVerified: false,
  //   className: "step-notification",
  // },
  {
    label: "Deposit",
    icon: <FaCreditCard />,
    path: menus.deposit,
    hideOnVerified: false,
    disabledOnNotVerified: false,
    className: "step-deposit",
  },

  {
    label: "Withdraw",
    icon: <IoShareSocial />,
    path: menus.wallet,
    hideOnVerified: false,
    disabledOnNotVerified: false,
    className: "step-share-earn",
  },
  // {
  //   label: "Share & Earn",
  //   icon: <IoShareSocial />,
  //   path: menus.shareAndEarn,
  //   hideOnVerified: false,
  //   disabledOnNotVerified: false,
  //   className: "step-share-earn",
  // },
  {
    label: "Transactions History",
    icon: <GrTransaction />,
    path: null,
    hideOnVerified: false,
    disabledOnNotVerified: false,
    className: "step-transaction",
    subMenus: [
      {
        label: "Deposit",
        icon: <FaMoneyCheckDollar />,
        path: menus["deposit-history"],
      },
      {
        label: "Withdraw",
        icon: <FaWallet />,
        path: menus["withdraw-history"],
      },
    ],
  },
  // {
  //   label: "Advertisement",
  //   icon: <RiAdvertisementFill />,
  //   path: null,
  //   hideOnVerified: false,
  //   disabledOnNotVerified: false,
  //   className: "step-advertisement",
  //   subMenus: [
  //     {
  //       label: "Add new Ads",
  //       icon: <FaBuysellads />,
  //       path: menus["add-new-ads"],
  //     },
  //     {
  //       label: "History",
  //       icon: <MdWorkHistory />,
  //       path: menus.history,
  //     },
  //   ],
  // },
  // {
  //   label: "Ticket",
  //   icon: <IoTicket />,
  //   path: menus.ticket,
  //   hideOnVerified: false,
  //   disabledOnNotVerified: false,
  //   className: "step-tickets",
  // },
  // {
  //   label: "Play & Earn ",
  //   icon: <FaTrophy />,
  //   path: menus.playandearn,
  //   hideOnVerified: false,
  //   disabledOnNotVerified: false,
  //   className: "step-play-and-earn",
  // },
];

export const userPopOverMenus = [
  {
    icon: FaUser,
    label: "My profile",
    path: menus.userProfile,
    external: false,
  },
  // {
  //   icon: GrUserWorker,
  //   label: "Top worker",
  //   path: menus.topWorkers,
  //   external: false,
  // },
  // {
  //   icon: HiArrowTrendingUp,
  //   label: "Top job poster",
  //   path: menus.topJobPoster,
  //   external: false,
  // },
  // {
  //   icon: HiArrowTrendingUp,
  //   label: "Top refer",
  //   path: menus.topReffer,
  //   external: false,
  // },
  // {
  //   icon: PiUserCheckFill,
  //   label: "Top users",
  //   path: menus.bestUsers,
  //   external: false,
  // },
  {
    icon: IoIosWallet,
    label: "Wallet",
    path: menus.wallet,
    external: false,
  },
  // {
  //   icon: FaTelegramPlane,
  //   label: "Join Telegram",
  //   path: "https://t.me/joinchat/AAAAAEc-5_45Y095",
  //   external: true,
  // },
  // {
  //   icon: BiSupport,
  //   label: "Live support",
  //   path: menus["live-support"],
  //   external: false,
  // },
];

export const deshboardFooterMenus = [
  // {
  //   label: "About Us",
  //   href: "/about-us",
  // },
  // {
  //   label: "Privacy Policy",
  //   href: "/privacy-policy",
  // },
  // {
  //   label: "FAQ",
  //   href: "/faq",
  // },
  // {
  //   label: "Blogs",
  //   href: "/blogs",
  // },
];

export const homeLayoutMenus = [
  // { label: "Live support", path: "/live-support", loginRequired: false },
  // { label: "Blogs", path: "/blogs", loginRequired: false },
  { label: "Sign In", path: "/signin", loginRequired: false },
  { label: "Sign Up", path: "/signup", loginRequired: false },
  { label: "Home", path: "/", loginRequired: true },
  // { label: "All Jobs", path: "/jobs", loginRequired: true },
  // { label: "Blogs", path: "/blogs", loginRequired: true },
  { label: "Dashboard", path: "/deposit", loginRequired: true },
];

export const footerMenus = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      ,
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Cancelation Policy", href: "/cancelation-policy" },
      { label: "Blogs", href: "/blogs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/live-support" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];
