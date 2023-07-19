// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyERC721 is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private _promptDescription;
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name, string memory symbol, string memory promptDescription) ERC721(name, symbol) {
        _promptDescription = promptDescription;
    }

    function promptDescription() public view returns (string memory) {
        return _promptDescription;
    }

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }

    function _setTokenURI(uint256 tokenId, string memory uri) internal virtual {
        _tokenURIs[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    // Function to get the total supply of NFTs
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Override the balanceOf function to return the number of tokens owned by an address
    function balanceOf(address owner) public view override returns (uint256) {
        return super.balanceOf(owner); // Use the built-in balanceOf function from ERC721
    }  
}
