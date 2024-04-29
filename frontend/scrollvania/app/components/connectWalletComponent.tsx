"use client";

import * as React from "react";
import { config } from "../../utils/config";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  Theme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const myCustomTheme: Theme = {
  blurs: {
    modalOverlay: "blur(4px)",
  },
  colors: {
    accentColor: "hsl(0 0% 100%)",
    accentColorForeground: "hsl(225, 0%, 0%)",
    actionButtonBorder: "hsl(0, 0%, 100%)",
    actionButtonBorderMobile: "hsl(0, 0%, 100%)",
    actionButtonSecondaryBackground: "hsl(225, 0%, 0%)",
    closeButton: "hsl(180, 3%, 39%)",
    closeButtonBackground: "hsl(0, 0%, 94%)",
    connectButtonBackground: "hsl(0, 0%, 100%)",
    connectButtonBackgroundError: "hsl(360,100%,64%)",
    connectButtonInnerBackground: "hsl(0, 0%, 95%)",
    connectButtonText: "hsl(225, 0%, 0%)",
    connectButtonTextError: "hsl(0,0%,100%)",
    error: "hsl(0,0%,100%)",
    generalBorder: "hsl(180, 0%, 94%)",
    generalBorderDim: "rgba(0, 0, 0, 0.03)",
    menuItemBackground: "hsl(180, 3%, 92%)",
    modalBackdrop: "rgba(0, 0, 0, 0.5)",
    modalBackground: "hsl(0, 0%, 100%)",
    modalBorder: "hsl(0, 0%, 100%)",
    modalText: "hsl(213, 11%, 16%)",
    modalTextDim: "rgba(60, 66, 66, 0.3)",
    modalTextSecondary: "hsl(200, 1%, 55%)",
    profileAction: "hsl(0, 0%, 100%)",
    profileActionHover: "hsl(0, 0%, 98%)",
    profileForeground: "hsl(0, 0%, 96%)",
    selectedOptionBorder: "hsl(0 0% 100%)",
    downloadBottomCardBackground:
      '"linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF"',
    downloadTopCardBackground:
      '"linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF"',
    connectionIndicator: "hsl(107, 100%, 44%)",
    standby: "hsl(47, 100%, 63%)",
  },
  fonts: {
    body: "...",
  },
  radii: {
    actionButton: "40.8px",
    connectButton: "20.4px",
    menuButton: "20.4px",
    modal: "40.8px",
    modalMobile: "40.8px",
  },
  shadows: {
    connectButton: "0px 8px 32px rgba(0, 0, 0, 0.32)",
    dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
    profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
    selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.12)",
    walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)",
  },
};

const { wallets } = getDefaultWallets();

// const config = getDefaultConfig({
//   appName: 'RainbowKit demo',
//   projectId: 'YOUR_PROJECT_ID',
//   wallets: [
//     ...wallets
//   ],
//   chains: [
//     mainnet,
//     polygon,
//     optimism,
//     arbitrum,
//     base,
//     ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
//   ],
//   ssr: true,
// });

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myCustomTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
