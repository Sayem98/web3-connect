import { useReadContract, useWriteContract } from "wagmi";
import type {
  UseReadContractParameters,
  UseReadContractReturnType,
  UseWriteContractParameters,
} from "wagmi";
import { tokenAbi } from "../abis/abi";
import { useNetworkData } from "./useNetworkData";
import { Abi } from "viem";
import { config } from "../config";

type UseTokenReadParameters = Omit<
  UseReadContractParameters,
  "abi" | "address" | "functionName" | "args"
>;

export const useTokenRead = (
  functionName: string,
  args?: Array<unknown>,
  options?: UseTokenReadParameters
): UseReadContractReturnType => {
  const { token } = useNetworkData();
  const result = useReadContract({
    abi: tokenAbi as Abi,
    address: token,
    functionName,
    args,
    ...options,
  });
  return result;
};

type UseTokenWriteParameters = Pick<
  UseWriteContractParameters,
  "mutation"
>["mutation"];
export const useTokenWrite = (
  functionName: string,
  options?: UseTokenWriteParameters
) => {
  const { token } = useNetworkData();
  const { writeContractAsync, writeContract, ...rest } = useWriteContract({
    config: config,
    ...options,
  });

  const write = async (params: Array<unknown> = []) => {
    return writeContractAsync({
      abi: tokenAbi as Abi,
      address: token,
      functionName,
      args: params,
    });
  };
  return {
    write,
    ...rest,
  };
};
