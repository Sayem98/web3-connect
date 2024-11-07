import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useBlockNumber, useBalance, useAccount } from "wagmi";
import { useTokenRead, useTokenWrite } from "./blockchain/hooks/useToken";
import { serializeData } from "./blockchain/utils";
import type { Address } from "./lib/types/network";
import { parseEther } from "viem";

function Details() {
  const [receiver, setReceiver] = useState<Address>();
  const [amount, setAmount] = useState<number>();

  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: balance, queryKey } = useBalance({
    address: address,
  });

  const result = useTokenRead("name", undefined, {
    query: {
      placeholderData: "Loading...",
    },
  });
  const tokenTransfer = useTokenWrite("transfer", {});

  console.log("balance", serializeData(balance));
  console.log(serializeData(result));

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
    queryClient.invalidateQueries({ queryKey: result.queryKey });
  }, [blockNumber]);

  const handleTransfer = async () => {
    if (!receiver || !amount) {
      window.alert("Please enter receiver and amount");
    }
    try {
      // convert amount to bigInt

      // write contract
      tokenTransfer.write([
        receiver,
        parseEther((amount as number).toString(), "wei"),
      ]);
      window.alert("Transfer success");
    } catch (e) {
      console.log(e);
      window.alert("Transfer failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Details</h1>
      <div>Balance: {balance?.formatted}</div>
      <div>Block Number: {Number(blockNumber)}</div>
      <div>Name:{result.data as string} </div>

      {/* transfer token */}
      <input
        value={receiver}
        onChange={(e) => setReceiver(e.target.value as Address)}
        className="border-2 w-full"
        placeholder="Receiver"
      />
      <br />
      <input
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border-2 w-full"
        placeholder="Amount"
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
}

export { Details };
