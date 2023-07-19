const hre = require("hardhat");

async function main() {
  // Connect to the Goerli Ethereum Testnet
  const network = hre.network.name;
  console.log("Connected to network:", network);

  // Retrieve the deployed contract instance
  const MyERC721 = await hre.ethers.getContractFactory("MyERC721");
  const myERC721 = await MyERC721.attach("0x0619e3a59196cc0E199C44fCd2D2756dEDa1C9A1");
  console.log("Contract address:", myERC721.address);

  // Define the IPFS URLs for the NFTs
  const ipfsUrls = [
    "https://gateway.pinata.cloud/ipfs/QmXzEiBU4hFagAMcby9vf3z2hq4iWEZtqw3wFHJnXHscyQ",
    "https://gateway.pinata.cloud/ipfs/QmRjU3xqXZKCqyyFxzYRH6DQRnfjbximSD6s1CefdGEXKhT",
    "https://gateway.pinata.cloud/ipfs/QmduRKMdkU7v2PYKxBCCvYZrGC2Gud54dJCmKyK3tzuQiN",
    "https://gateway.pinata.cloud/ipfs/Qme1VBgNTiyPcTkzi38crYokVA744z5fGBei89FuGRSxJY",
    "https://gateway.pinata.cloud/ipfs/QmZtePCqc75cdbBK4Qe7SbRTUWwusJU4Mtnny4owgSnhiu"
  ];

  // Batch mint all NFTs
  for (let i = 0; i < ipfsUrls.length; i++) {
    const recipient = await hre.ethers.provider.getSigner().getAddress();
    const tx = await myERC721.mintNFT(recipient, ipfsUrls[i]);
    const receipt = await tx.wait();
    const tokenId = receipt.events[0].args.tokenId;
    console.log(`Minted NFT with token ID ${tokenId}`);
  }
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
