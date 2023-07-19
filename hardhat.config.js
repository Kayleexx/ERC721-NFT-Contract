require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    version: "0.8.1",
  },
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/336a201c36684a2f884db2578ac19cff",
      accounts: ['24cd23a482e9ab5ec92e505539114b9bfb42aff73dde59512d095502d78cdaaa'],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: ['24cd23a482e9ab5ec92e505539114b9bfb42aff73dde59512d095502d78cdaaa'],
    },
  },
};


