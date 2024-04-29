'use client';

import * as React from 'react';
import {config} from '../../utils/config';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  Theme,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const myCustomTheme: Theme = {
  blurs: {
    modalOverlay: '...',
  },
  colors: {
    accentColor: 'white',
    accentColorForeground: '',
    actionButtonBorder: '...',
    actionButtonBorderMobile: '...',
    actionButtonSecondaryBackground: ' red ',
    closeButton: '...',
    closeButtonBackground: '...',
    connectButtonBackground: '...',
    connectButtonBackgroundError: '...',
    connectButtonInnerBackground: '...',
    connectButtonText: '...',
    connectButtonTextError: '...',
    connectionIndicator: '...',
    downloadBottomCardBackground: '...',
    downloadTopCardBackground: '...',
    error: '...',
    generalBorder: '...',
    generalBorderDim: '...',
    menuItemBackground: '...',
    modalBackdrop: '...',
    modalBackground: 'white',
    modalBorder: '...',
    modalText: 'black',
    modalTextDim: '...',
    modalTextSecondary: '...',
    profileAction: '...',
    profileActionHover: '...',
    profileForeground: '...',
    selectedOptionBorder: '...',
    standby: '...',
  },
  fonts: {
    body: '...',
  },
  radii: {
    actionButton: '...',
    connectButton: '...',
    menuButton: '...',
    modal: '...',
    modalMobile: '...',
  },
  shadows: {
    connectButton: '...',
    dialog: '...',
    profileDetailsAction: '...',
    selectedOption: '...',
    selectedWallet: '...',
    walletLogo: '...',
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
        <RainbowKitProvider theme={myCustomTheme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
