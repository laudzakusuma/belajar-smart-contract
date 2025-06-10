// File: scripts/deployAndGet.js

const hre = require("hardhat");

async function main() {
  console.log("🚀 Memulai proses deploy dan panggil fungsi...");

  // 1. DEPLOY KONTRAK
  // ===================================
  console.log("Mendeploy kontrak Youtube...");
  const Youtube = await hre.ethers.getContractFactory("Youtube");
  const youtube = await Youtube.deploy();

  await youtube.waitForDeployment();
  const contractAddress = await youtube.getAddress();
  console.log(`✅ Kontrak berhasil di-deploy ke alamat: ${contractAddress}`);

  console.log("-----------------------------------------");

  // 2. PANGGIL FUNGSI DARI KONTRAK YANG BARU DIDEPLOY
  // =======================================================
  console.log("Memanggil fungsi dari kontrak...");
  
  const pemilik = await youtube.getPemilik();
  const textRaw = await youtube.textRaw();

  console.log(`✅ Alamat Pemilik (Owner): ${pemilik}`);
  console.log(`✅ Isi Text Awal: "${textRaw}"`);
  console.log("\n🎉 Semua proses selesai dengan sukses!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});