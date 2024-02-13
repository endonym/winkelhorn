const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const mintUtils = require("../scripts/mint-utils");

const name = "Tester";
const symbol = "TEST";

const uris = [
  "ipfs://QmaNJsquyF6KiJ4oRkVs9hxSqTCEQWSaodByi5FJkgiiY5",
  "ipfs://QmdSTS88MJPJHpNHcLp1Qgx4eWPuy13h7VZCX4oqRe2vT5"
];

mintUtils.verifyUris(uris);

// Given the simplicity of the project and the robustness of OpenZeppelin 
// contracts I limited the scope of testing to a few basic feature tests.
// It's more of a demo than a complete test suite. 
describe("MintContract", function () {
  
  async function deployMintContract() {
    const firstIpfsAddress = uris[0];
    const totalSupply = uris.length;

    const [owner, otherAccount] = await ethers.getSigners();

    const Mint = await ethers.getContractFactory("MintContract");
    const mint = await Mint.deploy(name, symbol, owner.address, uris);

    return { mint, name, symbol, owner, 
            otherAccount, totalSupply, 
            firstIpfsAddress
          };
  
  }

  describe("Deployment", function () {
    it("Should have the correct name", async function () {
      const { mint, name } = await loadFixture(deployMintContract);
      expect(await mint.name()).to.equal(name);

    });

    it("Should set the right owner", async function () {
      const { mint, owner, totalSupply } = await loadFixture(deployMintContract);

      expect(await mint.balanceOf(owner)).to.equal(totalSupply);
    });

    it("Should have the correct symbol", async function () {
      const { mint, symbol } = await loadFixture(deployMintContract);

      expect(await mint.symbol()).to.equal(symbol);
    });

    it("Should have the correct number of contracts", async function () {
      const { mint, totalSupply } = await loadFixture(deployMintContract);
      expect(await mint.totalSupply()).to.equal(totalSupply);

    });

    it("Should have an IPFS URI", async function () {
      const { mint, firstIpfsAddress } = await loadFixture(deployMintContract);
      expect(await mint.tokenURI(1)).to.equal(firstIpfsAddress);
      
    });
  });

  describe("Transfer", function () {
    it("Should reduce this owner's balance", async function () {
      const { mint, owner, otherAccount, totalSupply } = await loadFixture(deployMintContract);      
      await mint.safeTransferFrom(owner, otherAccount, 1);

      const supply = await mint.totalSupply();
      console.log("\t Pulling NFTs from Contract - One or two are owned by a different account.");
      for (let i=0; i<supply; i++){
        const tokenId = await mint.tokenByIndex(i);
        const tokenUri = await mint.tokenURI(tokenId);
        const ownedBy = await mint.ownerOf(tokenId);
        console.log("\t\t" + tokenId + " " + tokenUri + " " + ownedBy);
      }

      expect(await mint.balanceOf(owner)).to.equal(totalSupply-1);
      expect(await mint.balanceOf(otherAccount)).to.equal(1);

    });

    it("Should reject transfer", async function () {
      const { mint, owner, otherAccount } = await loadFixture(deployMintContract);      
      await mint.safeTransferFrom(owner, otherAccount, 2);
      expect(mint.safeTransferFrom(owner, otherAccount, 2))
        .to.be.rejectedWith(Error, "ERC721InsufficientApproval");

    });
  });
});

