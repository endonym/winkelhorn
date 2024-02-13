require("hardhat");

// Scratch file for inspecting account balance
async function main(){
    const [signer] = await ethers.getSigners();
    const address = await signer.getAddress();
    const balance = await ethers.provider.getBalance(address);
    const balanceInEth = ethers.formatEther(balance);
    console.log("Account balance:", balanceInEth, " MATIC");

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
  