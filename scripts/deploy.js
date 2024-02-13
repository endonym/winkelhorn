require("hardhat");
const utils = require("./mint-utils.js");

async function main() {

  const admin = "--owner-account--";

  const uris = [
      "ipfs://-insert-your-ipfs-hash-here"
    ];
    
    utils.verifyUris(uris);

    const Mint = await ethers.getContractFactory("MintContract");
    const mint = await Mint.deploy("--collection-name--", "--symbol--", admin, uris);
    await mint.waitForDeployment();

    const tokens = await mint.totalSupply();

    for (let i = 0; i<tokens; i++){
        const uri = await mint.tokenURI(i + 1);
        console.log(uri);
    }
    
    console.log(
      `One Shot deployed to ${mint.target}`

    );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
