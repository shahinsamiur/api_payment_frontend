import {
  useGetPassimpayPaymentInfoQuery,
  useGetPaymentInfoQuery,
} from "@/store/features/payment";
import { useSelector } from "react-redux";

const useGetPaymentInfo = ({ token, orderId, type }) => {
  const { token: authToken } = useSelector((state) => state.user);
  const { data: apayPaymentInfo, isLoading: apayLoading } =
    useGetPaymentInfoQuery(token, {
      skip: !token || !authToken || type === "passimpay",
    });
  const { data: passimpayPaymentInfo, isLoading: passimpayLoading } =
    useGetPassimpayPaymentInfoQuery(orderId, {
      skip: !orderId || !authToken || type === "apay",
    });

  return {
    data: type === "apay" ? apayPaymentInfo : passimpayPaymentInfo,
    isLoading: apayLoading || passimpayLoading,
  };
};

export default useGetPaymentInfo;
