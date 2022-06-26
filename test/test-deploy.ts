import {expect, assert} from "chai"
import {ethers} from "hardhat"
import {SimpleStorage, SimpleStorage__factory} from "../typechain-types"

describe("SimpleStorage", function () {
  let SimpleStorageFactory: SimpleStorage__factory
  let simpleStorage: SimpleStorage
  beforeEach(async function () {
    SimpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory
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