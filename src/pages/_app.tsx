import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import Link from "next/link";
import { css } from "@emotion/css";
import { ethers } from "ethers";
import { AccountContext } from "src/context";
import { ownerAddress } from "../../config";
import "easymde/dist/easymde.min.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [account, setAccount] = useState(null);

  const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "BlogThree",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
