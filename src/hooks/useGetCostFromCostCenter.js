import { useSelector } from "react-redux";

function useGetCostFromCostCenter(name) {
  const { costCenter } = useSelector((state) => state.settings);

  const cost = costCenter.find((cost) => cost.name === name);

  return cost || {};
}

export default useGetCostFromCostCenter;
