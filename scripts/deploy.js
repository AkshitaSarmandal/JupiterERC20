const hre = require("hardhat");
const { network, ethers } = require("hardhat")

async function main() {
  const jupiterErc = await hre.ethers.deployContract("JupiterERC");

  await jupiterErc.waitForDeployment();

  console.log(
    `JupiterERC deployed to ${jupiterErc.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// https://sepolia.etherscan.io/address/0xcFFa88456B2a3C9428317f12D307A453FfAb777d#readContract