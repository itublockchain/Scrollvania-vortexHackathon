import { http, createConfig } from "wagmi";
import { scrollSepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [scrollSepolia],
  transports: {
    [scrollSepolia.id]: http("https://sepolia-rpc.scroll.io/"),
  },
});
