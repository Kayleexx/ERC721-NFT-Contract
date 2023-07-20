const hre = require("hardhat");

async function main() {
  // Connect to the Mumbai Ethereum Testnet
  if (hre.network.name !== "mumbai") {
    throw new Error("Please run the script on the Mumbai network.");
  }

  console.log("Connected to network:", hre.network.name);

  // Define the contract addresses for the FxPortal Bridge and MyERC721 contract on Ethereum
  const bridgeAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de"; // Replace with the address of the FxPortal Bridge contract on Ethereum
  const myERC721Address = "0x1AeB8D9F19A2d608b30C77eb98f03B99ed8CFE0E"; // Replace with the address of your deployed MyERC721 contract on Ethereum

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

  // Test balanceOf
  const balance = await MyERC721.balanceOf(wallet.address);

  // Print the balance of the wallet
  console.log("MyERC721 wallet balance", wallet.address, "is:", balance.toString());

}

// Run the script with the Hardhat command line interface
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
