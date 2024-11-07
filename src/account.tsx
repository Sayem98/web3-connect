import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Details } from "./details";

export function Account() {
  const { address, chain, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  console.log(chain, chainId);

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
      <Details />
    </div>
  );
}
