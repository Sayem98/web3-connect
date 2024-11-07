import * as React from "react";
import { Connector, useConnect } from "wagmi";

export const WalletOptions = () => {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex justify-center gap-2">
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  );
};

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      disabled={!ready}
      onClick={onClick}
      className="border-2 border-gray-300 rounded-md px-4 py-2"
    >
      {connector.name}
    </button>
  );
}
