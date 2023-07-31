# ERC721 NFT Contract

This project contains a simple ERC-721 compliant smart contract for creating and managing non-fungible tokens (NFTs) on the Polygon blockchain. The contract allows users to mint new NFTs, set their metadata (URI), and check the total supply and balance of NFTs.

## Getting Started

### Prerequisites

- Node.js (>= 12.0.0)
- npm (>= 6.0.0)
- Hardhat (>= 2.0.0)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

2. Install the required dependencies:

   ```bash
   npm install
   
## Deployment

To deploy the ERC721 contract to the Goerli testnet, run the following command:

`npx hardhat run scripts/deploy.js --network goerli`

To deploy the ERC721 contract to the Mumbai testnet, run the following command:

`npx hardhat run scripts/deploy.js --network mumbai`

This will deploy the contract and display the contract address on the console.

## Testing
To run the tests, use the following command:

`npx hardhat test`

## Features
The contract provides the following functionalities:

1. `mintNFT(address recipient, string memory tokenURI)`: Mint a new NFT with the given metadata URI and assign it to the specified recipient address.

2. `tokenURI(uint256 tokenId`): Retrieve the metadata URI associated with a specific NFT token ID.

3. `totalSupply()`: Get the total number of NFTs minted so far.

4. `balanceOf(address owner)`: Get the number of NFTs owned by a particular address.

## Example
Here's an example of how to use the ERC721 contract:


```javascript
// Deploy the contract (using Hardhat)
const MyERC721 = await ethers.getContractFactory("MyERC721");
const myERC721 = await MyERC721.deploy("Kaylee's NFT", "KNFT", "Description of my NFTs");
await myERC721.deployed();

// Mint a new NFT
const recipient = "0xRecipientAddress"; // Replace with the recipient's Ethereum address
const tokenURI = "https://ipfs.io/ipfs/QmTokenMetadata"; // Replace with the token's metadata URI on IPFS
await myERC721.mintNFT(recipient, tokenURI);

// Retrieve token metadata URI
const tokenId = 1; // Token ID of the newly minted NFT
const metadataURI = await myERC721.tokenURI(tokenId);
console.log("Token Metadata URI:", metadataURI);

// Get total supply and balance of NFTs
const totalSupply = await myERC721.totalSupply();
console.log("Total NFTs:", totalSupply.toString());

const ownerAddress = "0xOwnerAddress"; // Replace with the address of the NFT owner
const balance = await myERC721.balanceOf(ownerAddress);
console.log("NFT Balance of Owner:", balance.toString());
```

## Contributing
Contributions to this repository are not accepted as it is for personal assignments. However, if you have suggestions or feedback, feel free to open an issue.

## Author
Mitali Sinha 

## License
This project is licensed under the MIT License.


