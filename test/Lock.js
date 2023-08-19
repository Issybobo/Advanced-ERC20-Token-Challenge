const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20Token", function () {
  let ERC20Token;
  let erc20Token;
  let owner;
  let addr1;
  let addr2;

  const initialSupply = ethers.utils.parseEther("1000000");

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    ERC20Token = await ethers.getContractFactory("ERC20Token");
    erc20Token = await ERC20Token.deploy("DEFIX", "DFX", initialSupply);
    await erc20Token.deployed();
  });

  it("Should have correct name and symbol", async function () {
    expect(await erc20Token.name()).to.equal("DEFIX");
    expect(await erc20Token.symbol()).to.equal("DFX");
  });

  it("Should mint tokens correctly", async function () {
    await erc20Token.mint(addr1.address, ethers.utils.parseEther("100"));
    const balance = await erc20Token.balanceOf(addr1.address);

    expect(balance).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should burn tokens correctly", async function () {
    // Mint tokens to addr1 for testing
    await erc20Token.mint(addr1.address, ethers.utils.parseEther("100"));
    const initialBalance = await erc20Token.balanceOf(addr1.address);

    const burnAmount = ethers.utils.parseEther("50");

    await erc20Token.connect(addr1).burn(burnAmount);
    const newBalance = await erc20Token.balanceOf(addr1.address);

    expect(newBalance).to.equal(initialBalance.sub(burnAmount));
});





  it("Should transfer tokens correctly", async function () {
    await erc20Token.mint(addr1.address, ethers.utils.parseEther("100"));
    await erc20Token.connect(addr1).transfer(addr2.address, ethers.utils.parseEther("30"));
    const balance1 = await erc20Token.balanceOf(addr1.address);
    const balance2 = await erc20Token.balanceOf(addr2.address);

    expect(balance1).to.equal(ethers.utils.parseEther("70"));
    expect(balance2).to.equal(ethers.utils.parseEther("30"));
  });
});
