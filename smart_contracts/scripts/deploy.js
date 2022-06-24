const hre = require("hardhat");
const fs = require("fs");


async function main() {
  // We get the contract to deploy
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy("Voting contract");

  await voting.deployed();

  console.log("Voting contract deployed to:", voting.address);

  fs.writeFileSync('./config.js', `
  export const contractAddress = "${blog.address}"
  export const ownerAddress = "${blog.signer.address}"
`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
