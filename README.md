# The Winkelhorn Collection

## Brief:

The objective is to develop a simple ERC721 smart contract to be deployed on the Polygon POS chain. 
This contract is designed to allow an admin-controlled wallet to mint a series of 10 NFTs, 
which symbolize a cultural artefact that is used as an internal reward within the company. These 
NFTs are to be directly transferred to colleagues as a form of recognition for outstanding performance each month.

Requirements include:
- All 10 tokens will initially be sent to a singular, company-managed wallet for subsequent monthly distribution to winners.
- The contract should enable direct transfer of NFTs from the admin's wallet to the winner's wallet.
- For ease of recognition, the NFT collection will be named "Winkelhorn" with the symbol "WINK".

## Clarifications Sought:

**On the Admin Wallet Concern:**

A query was raised regarding the term "Admin Wallet", which, as clarified, refers to a digital wallet controlled by an individual (or individuals) at the firm. This clarification established that the minting privilege is to be confined to this specific wallet.

**Privilege Mechanism:**

Two potential approaches were discussed for implementing the privilege mechanism for minting:

1. Role-Based Access Control (RBAC) which requires the admin’s wallet address but lacks flexibility.
2. Privilege by token, offering transferability of minting privilege between wallets, hence more flexible but complex.

Given the requirement for a UI, RBAC was initially favoured; however, the features of ERC721 allowed us to maintain a non-interactive scope and avoid any UI. (See next)

**Minting and Transfer Process:**

The necessity of two buttons was debated – one for connecting a Metamask wallet and the other for minting an NFT. An alternative approach proposed involved minting all NFTs upon deployment and utilizing the ERC721 transfer function for monthly distribution, potentially simplifying the process by removing the need for active minting post-deployment.

This minting and initial distribution was favored over creating an interactive minting process due to the significant difference in project scope.

## Decisions:

- The choice was made for pre-minting of all NFTs at deployment, favoring the streamlined process of transferring pre-minted NFTs.
- ERC721 transfer function are available in most wallets, ensuring ease of transferring NFTs from the admin's wallet to recipients.
- The NFT collection will be named "Winkelhorn" with the symbol "WINK", ensuring a unique identity within the blockchain space.

# Installation

##  Pre-requisites

- **Solidity**:  ^0.8.20.
- **Node.js**: 12.x or higher
- **Hardhat Development Environment**: Follow their instructions.
- **Ethereum Wallet**: A personal Ethereum wallet (e.g., MetaMask)

## Install

* Clone this repository

```
git clone https://github.com/endonym/winkelhorn.git
```

* Install Node Dependencies
```

npm install
```
* From the winklehorn directory run;
```
npm install --save-dev hardhat
```

* Compile

```
npx hardhat clean
npx hardhat compile
```

There are some scratch files for IPFS and checking that you're authenticating correctly with whatever network you're connecting to; otherwise run the tests.

# Tests

To run tests it is best to use the local network provided with Hardhat. 

```
npx hardhat test test/MintContract.js
```

# Environment Variables
These environment variables are all optional.

```sh

# The test network private key
# [OPT: You only need this to connect to a test network]
# See hardhat.config.js

export WALLET_PRIVATE_KEY="<insert your key>"

# The main network private key
# [OPT: You only need this to connect to a main network]

export MAINNET_PRIVATE_KEY="<insert your key>"

# Your Pinata API Key for publishing files
# [OPT: You only need this for publishing to IPFS via Pinata]

export JWT="<insert your key>"

```