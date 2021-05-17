/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    rink: {
      url: 'https://rinkeby.infura.io/v3/c71c53cafb3046609eccd39a0fc5e373',
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};