require("hardhat");

// Scratch file for basic inspections.
async function main() {
    
    console.log("\n----\n");
    const ADDRESS = "--target-address--";
    const [owner] = await ethers.getSigners();
    const contract = await ethers.getContractAt("MintContract", ADDRESS);

    const tokens = await contract.totalSupply();

    for (let i = 0; i<tokens; i++){
        const uri = await contract.tokenURI(i + 1);
        console.log(uri);

    }

    const balance = await contract.balanceOf(owner.address);
    const uri = await contract.tokenURI(1);
    const name = await contract.name();
    const symbol = await contract.symbol();
    
    console.log(`Name ${name}\nSymbol ${symbol}`);
    console.log(`Address ${owner.address}\nOwns ${balance.toString()} NFT(s) \nURI=${uri}`);

}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
