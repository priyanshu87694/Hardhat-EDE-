const { expect, assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", function () {
  let SimpleStorageFactory
  let simpleStorage
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await SimpleStorageFactory.deploy()
  })
  it("It should initialize favouriteNuber with 0", async function () {
    const actualValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(actualValue.toString(), expectedValue)
  })
  it("It should store expectedValue when called store", async function () {
    const expectedValue = "8"
    const transactionResponse = await simpleStorage.store(expectedValue)
    transactionResponse.wait(1)
    const actualValue = await simpleStorage.retrieve()

    assert.equal(expectedValue, actualValue.toString())
  })
})