const hre = require("hardhat");

async function main() {
  // Deploying the contract
  const MyERC721 = await hre.ethers.getContractFactory("MyERC721");
  const myERC721 = await MyERC721.deploy("Kaylee's NFT", "KNFT", "Description of my NFTs");
  await myERC721.deployed();

  console.log("MyERC721 contract deployed to:", myERC721.address);
}

// Running the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
