"use strict";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();

require("@nomiclabs/hardhat-ethers");

var _process$env = process.env,
    API_URL = _process$env.API_URL,
    PRIVATE_KEY = _process$env.PRIVATE_KEY;
module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: API_URL,
      accounts: ["0x".concat(PRIVATE_KEY)]
    },
    rink: {
      url: 'https://rinkeby.infura.io/v3/c71c53cafb3046609eccd39a0fc5e373',
      accounts: ["0x".concat(PRIVATE_KEY)]
    }
  }
};