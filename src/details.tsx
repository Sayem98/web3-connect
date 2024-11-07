import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useBlockNumber, useBalance, useAccount } from "wagmi";

function Details() {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: balance, queryKey } = useBalance({
    address: address,
  });

  console.log("balance", balance);
  console.log("blockNumber", blockNumber);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  return <div>{balance?.value?.toString()}</div>;
}

export { Details };
