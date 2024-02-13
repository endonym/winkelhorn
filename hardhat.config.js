require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */

const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY

module.exports = {
  solidity: "0.8.20",
  networks: {
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com`,
      accounts: [WALLET_PRIVATE_KEY]
    }, 
    polygon: {
      url: `https://polygon-rpc.com`,
      accounts: [MAINNET_PRIVATE_KEY]
    }
  }
};
