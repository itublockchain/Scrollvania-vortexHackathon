import { http, createConfig } from "wagmi";
import { scrollSepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [scrollSepolia],
  transports: {
    [scrollSepolia.id]: http("https://rpc.ankr.com/scroll_sepolia_testnet/d17775fb78762b92aacf9f30af7ccaac0c4e758d5bb9f2ebc3faef3b9cbed604"),
  },
});
