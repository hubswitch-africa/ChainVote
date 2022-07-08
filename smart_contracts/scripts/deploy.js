const hre = require("hardhat");
const fs = require("fs");


async function main() {
  // We get the contract to deploy
  const Election = await hre.ethers.getContractFactory("Election");
  const election = await Election.deploy("Election contract");

  await election.deployed();

  console.log("Voting contract deployed to:", election.address);

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
