const { verifyMessage } = require("ethers/lib/utils")
const { ethers, run, network } = require("hardhat")
require("dotenv").config()

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract at: ${simpleStorage.address}`)
  console.log(network.config)
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }
  // interacting with the contract
  const currValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currValue}`)
  const transactionResponse = await simpleStorage.store(123)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated value: ${updatedValue}`)
}

async function verify (contractAddress, args) {
  console.log("Verifying...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      contructorArguments: args
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })