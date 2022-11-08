import { HardhatUserConfig } from "hardhat/config";
require("@nomiclabs/hardhat-waffle");

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // mumbai: {
    //   url: "https://rpc-mumbai.matic.today",
    //   accounts: [process.env.pk]
    // },
    // polygon": {
    //   url: "https://polygon-rpc.com/",
    //   accounts: [process.env.pk]
    // }
  },
};

export default config;
