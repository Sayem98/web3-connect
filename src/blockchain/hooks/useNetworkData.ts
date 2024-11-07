import { useAccount } from "wagmi";
import { getNetwork } from "../networks/networks";
import { Network } from "../../lib/types/network";

export const useNetworkData = (): Network => {
  const { chain, chainId } = useAccount();
  console.log(chain, chainId);

  const neworkData = getNetwork(chainId);

  return neworkData;
};
