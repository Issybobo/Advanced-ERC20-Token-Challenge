const { ethers } = require("hardhat");

async function main() {
  // Replace these values with your desired parameters
  const name = "DEFIX";
  const symbol = "DFX";
  const initialSupply = ethers.utils.parseEther("1000000"); // Example initial supply

  const ERC20Token = await ethers.getContractFactory("ERC20Token");
  const token = await ERC20Token.deploy(name, symbol, initialSupply);
  
  await token.deployed();

  console.log("ERC20 Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
