import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "dotenv/config"
import "@nomiclabs/hardhat-etherscan"
import "./tasks/block-number"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@typechain/hardhat"

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "0x00"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x00"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "0x00"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "0x00"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      // rinkeby chainId
      chainId: 4
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    }
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "INR",
    coinmarketCap: COINMARKETCAP_API_KEY,
    // token: "MATIC",
  }
};
