const { task } = require("hardhat/config")

task ("block-number", "Prints current blocknumber").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(blockNumber)
    }
)

module.exports = {}