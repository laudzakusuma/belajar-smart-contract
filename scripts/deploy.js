const hre = require("hardhat");

async function main() {
  const Youtube = await hre.ethers.getContractFactory("Youtube");
  
  const youtube = await Youtube.deploy();

  await youtube.waitForDeployment();

  console.log("Youtube deployed to:", await youtube.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });