// scripts/deploy.js
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // 1. Deploy kontrak
  const Youtube = await hre.ethers.getContractFactory("Youtube");
  const youtube = await Youtube.deploy();
  await youtube.waitForDeployment();
  const contractAddress = await youtube.getAddress();
  
  console.log(`✅ Kontrak "Youtube" berhasil di-deploy ke alamat: ${contractAddress}`);

  const contractArtifact = hre.artifacts.readArtifactSync("Youtube");
  
  const frontendData = {
    address: contractAddress,
    abi: contractArtifact.abi,
  };

  if (!fs.existsSync("./frontend/src/contract")) {
    fs.mkdirSync("./frontend/src/contract", { recursive: true });
  }

  fs.writeFileSync(
    "./frontend/src/contract/contract-info.json",
    JSON.stringify(frontendData, null, 2)
  );

  console.log("✅ Alamat kontrak dan ABI berhasil disalin ke './frontend/src/contract/contract-info.json'");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
