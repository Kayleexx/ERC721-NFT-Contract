const hre = require("hardhat");

async function main() {
  // Connect to the Mumbai Ethereum Testnet
  if (hre.network.name !== "mumbai") {
    throw new Error("Please run the script on the Mumbai network.");
  }

  console.log("Connected to network:", hre.network.name);

  // Define the contract addresses for the FxPortal Bridge and MyERC721 contract on Ethereum
  const bridgeAddress = "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA"; // Replace with the address of the FxPortal Bridge contract on Ethereum
  const myERC721Address = "0x737822c827f4D6D3B4b969DFc44FBF54FE6d7B08"; // Replace with the address of your deployed MyERC721 contract on Ethereum

  // Retrieve the deployed MyERC721 contract instance
  const MyERC721 = await hre.ethers.getContractFactory("MyERC721");
  const myERC721 = await MyERC721.attach(myERC721Address);
  console.log("Contract address:", myERC721.address);

  // Define the token IDs of the NFTs you want to transfer
  const tokenIds = [1, 2, 3, 4, 5]; 

  // Approve and deposit each NFT to the FxPortal Bridge for transfer
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    console.log(`Approving NFT with token ID ${tokenId} for transfer...`);
    await myERC721.approve(bridgeAddress, tokenId);

    console.log(`Depositing NFT with token ID ${tokenId} to the FxPortal Bridge...`);
    await myERC721["safeTransferFrom(address,address,uint256)"](hre.ethers.constants.AddressZero, bridgeAddress, tokenId);
  }

  console.log("Batch transfer of NFTs completed successfully!");
}

// Run the script with the Hardhat command line interface
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
