const main = async () => {
  [onwer, ...accounts] = await hre.ethers.getSigners();
  const JustNFTFactory = await hre.ethers.getContractFactory("JustNFT");
  const JustNFT = await JustNFTFactory.deploy();

  await JustNFT.deployed();

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy(JustNFT.address, {
    value: hre.ethers.utils.parseEther("0.00001"),
  });

  await waveContract.deployed();

  console.log("JustNFT address: ", JustNFT.address);
  console.log("WavePortal address: ", waveContract.address);

  const voter1mint = await JustNFT.connect(accounts[1]).mint(
    accounts[1].address
  );
  await voter1mint.wait();
  const voter2mint = await JustNFT.connect(accounts[2]).mint(
    accounts[2].address
  );
  await voter2mint.wait();

  const idea1mint = await waveContract
    .connect(accounts[1])
    .wave("This dumb idea", 1685387828, "uri");
  await idea1mint.wait();

  const vote1mint = await waveContract.connect(accounts[1]).vote(0, 0);
  await vote1mint.wait();
  const vote2mint = await waveContract.connect(accounts[2]).vote(0, 0);
  await vote2mint.wait();

  console.log("Vote array: ", await waveContract.getAllVotes(0));
  console.log("Total Vote Count: ", await waveContract.getTotalVotes(0));
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
