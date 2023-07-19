const hre = require("hardhat");

async function main() {
  // Connect to the Mumbai Ethereum Testnet
  if (hre.network.name !== "mumbai") {
    throw new Error("Please run the script on the Mumbai network.");
  }

  console.log("Connected to network:", hre.network.name);

  // Define the contract address for the deployed MyERC721 contract on Goerli
  const myERC721Address = "0x737822c827f4D6D3B4b969DFc44FBF54FE6d7B08"; // Replace with the address of your deployed MyERC721 contract on Goerli

  // Retrieve the deployed MyERC721 contract instance
  const MyERC721 = await hre.ethers.getContractFactory("MyERC721");
  const myERC721 = await MyERC721.attach(myERC721Address);
  console.log("Contract address:", myERC721.address);

  // Get the total supply of NFTs from the MyERC721 contract
  const totalSupply = await myERC721.totalSupply();
  console.log("Total NFTs to test balanceOf:", totalSupply.toString());

  // Test balanceOf on Goerli for each NFT
  const accounts = await hre.ethers.getSigners();
  for (let i = 1; i <= totalSupply; i++) {
    const tokenId = i;
    console.log(`Testing balanceOf for NFT with token ID ${tokenId}...`);
    for (const account of accounts) {
      const balance = await myERC721.connect(account).balanceOf(account.address);
      console.log(`NFT Balance for token ID ${tokenId} on Goerli (Account ${account.address}):`, balance.toString());
    }
  }
}

// Run the script with the Hardhat command line interface
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = main;
