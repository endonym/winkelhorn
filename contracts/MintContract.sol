// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintContract is ERC721URIStorage, ERC721Enumerable {

    constructor(string memory name, string memory symbol, 
        address assignee, string[] memory uriSet) 
        ERC721(name, symbol) {        
        for (uint256 i=0; i < uriSet.length; i++){ 
            uint256 tid = i+1;
            _mint(assignee, tid);
            _setTokenURI(tid, uriSet[i]);
            
        }
    }

    function tokenURI(uint256 tokenId) public view virtual 
        override(ERC721, ERC721URIStorage)
        returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual 
        override(ERC721URIStorage, ERC721Enumerable)
        returns (bool) {
            return super.supportsInterface(interfaceId);
    }

    function _update(address to, uint256 tokenId, address auth) internal virtual 
        override(ERC721, ERC721Enumerable)
        returns (address) {
            return super._update(to, tokenId, auth);
           
    }

    function _increaseBalance(address account, uint128 amount) internal virtual 
        override(ERC721, ERC721Enumerable) {
            super._increaseBalance(account, amount);
    }

}

