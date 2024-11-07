// import { Networks } from "@/lib/types/network";

import type { Networks, Network } from "../../lib/types/network";

const networks: Networks = {
  11155111: {
    contract: "0x95D59d33E017533b996eAf351cf7428fE7510bc0",
    token: "0x95D59d33E017533b996eAf351cf7428fE7510bc0",
  },
};

export const getNetwork = (chainId?: number): Network => {
  if (chainId === undefined || !networks[chainId]) {
    return networks[11155111];
  }
  return networks[chainId];
};
