/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");
require("@nomiclabs/hardhat-etherscan");
const { HARDHAT_PORT } = process.env;
const DEFAULT_GAS_MULTIPLIER = 1;
module.exports = {
  solidity: "0.8.4",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0x8e69be88f34b52becfa2ca0ea8fbbcdac7da7651ae3e6f5bf635b3b0ebb15947","balance":"1000000000000000000000"},{"privateKey":"0xc70d4fd3007e0ed01e580e04fdda7f1f7dfd41f8cc515e2ea286f915a2f6d673","balance":"1000000000000000000000"},{"privateKey":"0xb44fc814d9fd10af97bbc6fc4055077a3e1ea470858342a1afae526898144792","balance":"1000000000000000000000"},{"privateKey":"0xf5c14799d54c0d1da8ee878078d499d83282bfd388e2eeab95c5cf3c9051638d","balance":"1000000000000000000000"},{"privateKey":"0xbea975107fb96a4d77e889dec595dd50f82fffd03aa659e6cc842c6f3db8ec61","balance":"1000000000000000000000"},{"privateKey":"0x93a9058d77d12f966df4680d7548d416df4f9d537c3e5558231b21ee73eba80e","balance":"1000000000000000000000"},{"privateKey":"0xd5df5cba753db28adc1d981a884ff5558e09b6b48f84bea765096d27f6cffe48","balance":"1000000000000000000000"},{"privateKey":"0x6f59ba29c8aebe5eb8a6f3477dd627f68a6235a52293b71a0a9b6de4667434a6","balance":"1000000000000000000000"},{"privateKey":"0x8d6a76192d7dcf980d3dd88fecc602fab8567ce75be314812a147dc51737af87","balance":"1000000000000000000000"},{"privateKey":"0xc48df6279f6805d6d6c6beb4201af3da4129b8a6e824a104efc46fc2f5d7d446","balance":"1000000000000000000000"}]
    },
    truffle: {
      url: 'http://localhost:24012/rpc',
      timeout: 60000,
      gasMultiplier: DEFAULT_GAS_MULTIPLIER,
    },
  },
  etherscan: {
    goerli:"N9NCAAPTWV972DNWXUJQGKCTFYHX514W82",
    // mainnet: process.env.BLOCK_EXPLORER_API_KEY,
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};