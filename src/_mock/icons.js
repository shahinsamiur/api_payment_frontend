import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";

const servicesIconClass = "text-3xl text-white";

export const services = [
  <MdWorkHistory className={servicesIconClass} />,
  <FaCheck className={servicesIconClass} />,
  <FaRegMoneyBillAlt className={servicesIconClass} />,
];
