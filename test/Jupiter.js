const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("JupiterERC Deploy", function () {
  async function deployContract() {
    const [owner, add1, add2, add3, _] = await ethers.getSigners();
    const JupiterERC = await ethers.getContractFactory("JupiterERC");
    const jupiterERC = await JupiterERC.deploy();
    return { jupiterERC, owner, add1, add2, add3 };
  }

  describe("Testing JupiterERC contract", function () {
    
    it("Check owner balance", async () => {
      const { jupiterERC, owner } = await loadFixture(deployContract);
      const getOwnerBalance = await jupiterERC.balanceOf(owner.address);
      expect(await jupiterERC.totalSupply()).to.be.equals(getOwnerBalance);
    });

    it("Transfer Amount", async () => {
      const { jupiterERC, owner, add1, add2 } = await loadFixture(
        deployContract
      );

      const oldOwnerBalance = await jupiterERC.balanceOf(owner.address);
      await jupiterERC.connect(owner).transfer(add1.address, 12);
      expect(await jupiterERC.balanceOf(add1.address)).to.equal(12);
    });

    it("Check Event", async () => {
      const { jupiterERC, owner, add2 } = await loadFixture(deployContract);

      await expect(jupiterERC.connect(owner).transfer(add2.address, 12))
        .to.emit(jupiterERC, "Transfer")
        .withArgs(add2.address, owner.address, 12);
    });

    it("Test Validations", async () => {
      const { jupiterERC, owner, add2, add3 } = await loadFixture(
        deployContract
      );
      const initialBalance = await jupiterERC.balanceOf(owner.address);

      await expect(
        jupiterERC.connect(add3).transfer(add2.address, 50)
      ).to.be.revertedWith(
        "JupiterERC: Insufficient balance to perform transfer"
      );
      expect(await jupiterERC.balanceOf(owner.address)).to.equal(
        initialBalance
      );
    });
  });
});
