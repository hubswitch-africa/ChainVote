const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Election", function () {
  it("Should create an election", async function () {
    const Election = await ethers.getContractFactory("Election");
    const election = await Election.deploy("Hello, world!");
    await election.deployed();
    await election.createElection("2023", "presidential election");


    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
