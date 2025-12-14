import {
  useGetSingleDepositPaymentSystemQuery,
  useGetSinglePassimpayGatewayQuery,
} from "@/store/features/payment";

const useGetSingleGateWay = ({ id, type }) => {
  const { data: apayGateway, isLoading: apayLoading } =
    useGetSingleDepositPaymentSystemQuery(id, {
      skip: !id || type === "passimpay",
    });
  const { data: passimpayGateway, isLoading: passimpayLoading } =
    useGetSinglePassimpayGatewayQuery(id, {
      skip: !id || type === "apay",
    });

  return {
    data: type === "apay" ? apayGateway : passimpayGateway,
    isLoading: apayLoading || passimpayLoading,
  };
};

export default useGetSingleGateWay;
