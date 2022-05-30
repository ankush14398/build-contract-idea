const main = async () => {
  // const JustNFTFactory = await hre.ethers.getContractFactory("JustNFT");
  // const JustNFT = await JustNFTFactory.deploy();

  // await JustNFT.deployed();

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy(
    "0xe3F9A9A0C79edB93114ffc4feb0Fe251B2De92d4"
  );

  await waveContract.deployed();

  // console.log("JustNFT address: ", JustNFT.address);
  console.log("WavePortal address: ", waveContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();

// rinkeby NFT - 0xe3F9A9A0C79edB93114ffc4feb0Fe251B2De92d4
// rinkeby Portal - 0x5f8d802576FD326b5c1F5e3aAD6eD1C407129946
