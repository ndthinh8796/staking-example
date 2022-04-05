import { expect, use } from "chai"
import { ethers, network } from "hardhat"
import BN from "bn.js"
import ChaiBN from "chai-bn"

import {
	NDTToken__factory,
	TokenFarm__factory,
	MockDai__factory,
	MockWeth__factory,
	MockV3Aggregator__factory,
	MockV3Aggregator,
	MockWeth,
	MockDai,
	NDTToken,
	TokenFarm,
} from "../../front_end/src/lib/typechain-types"

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import {
	developmentChains,
	INITIAL_PRICE,
	DECIMALS,
	KEPT_BALANCE,
} from "../../utils/helperHardhat.config"
import { addAllowedTokens, setPriceFeedContract } from "../../utils/helpfulScripts"
import { AllowedTokens } from "../../utils/types"

// Enable and inject BN dependency
use(ChaiBN(BN))

const revertMessages = {
	notOwner: "Ownable: caller is not the owner",
}

const amount_staked = ethers.utils.parseEther("1")

let ndtToken: NDTToken__factory
let tokenFarm: TokenFarm__factory
let mockV3Aggregator: MockV3Aggregator__factory
let mockDai: MockDai__factory
let mockWeth: MockWeth__factory

let ndtTokenContract: NDTToken
let tokenFarmContract: TokenFarm
let ndtPriceFeedContract: MockV3Aggregator
let ethPriceFeedContract: MockV3Aggregator
let daiPriceFeedContract: MockV3Aggregator
let mockDaiContract: MockDai
let mockWethContract: MockWeth

let owner: SignerWithAddress
let addr1: SignerWithAddress
let addr2: SignerWithAddress

let allowedTokens: AllowedTokens

const stakeToken = async (account = owner, tokenContract: any = ndtTokenContract) => {
	await tokenContract.transfer(account.address, amount_staked)
	await tokenContract.connect(account).approve(tokenFarmContract.address, amount_staked)
	await tokenFarmContract.connect(account).stakeTokens(amount_staked, tokenContract.address)
}

!developmentChains.includes(network.name)
	? describe.skip
	: describe("TokenFarm", () => {
			before(async () => {
				ndtToken = (await ethers.getContractFactory("NDTToken")) as NDTToken__factory
				tokenFarm = (await ethers.getContractFactory("TokenFarm")) as TokenFarm__factory
				mockV3Aggregator = (await ethers.getContractFactory(
					"MockV3Aggregator"
				)) as MockV3Aggregator__factory
				mockDai = (await ethers.getContractFactory("MockDai")) as MockDai__factory
				mockWeth = (await ethers.getContractFactory("MockWeth")) as MockWeth__factory
			})

			beforeEach(async () => {
				;[owner, addr1, addr2] = await ethers.getSigners()

				// deploy token contracts
				ndtTokenContract = await ndtToken.deploy()
				await ndtTokenContract.deployed()
				mockDaiContract = await mockDai.deploy()
				await mockDaiContract.deployed()
				mockWethContract = await mockWeth.deploy()
				await mockWethContract.deployed()

				// deploy price feeds
				ndtPriceFeedContract = await mockV3Aggregator.deploy(DECIMALS, INITIAL_PRICE)
				await ndtPriceFeedContract.deployed()
				ethPriceFeedContract = await mockV3Aggregator.deploy(DECIMALS, INITIAL_PRICE)
				await ethPriceFeedContract.deployed()
				daiPriceFeedContract = await mockV3Aggregator.deploy(DECIMALS, INITIAL_PRICE)
				await daiPriceFeedContract.deployed()

				// deploy token farm
				tokenFarmContract = await tokenFarm.deploy(ndtTokenContract.address)
				await tokenFarmContract.deployed()

				// set allowed tokens
				allowedTokens = {
					ndtToken: {
						pricefeed: ndtPriceFeedContract.address,
						token: ndtTokenContract.address,
					},
					wethToken: {
						pricefeed: ethPriceFeedContract.address,
						token: mockWethContract.address,
					},
					daiToken: {
						pricefeed: daiPriceFeedContract.address,
						token: mockDaiContract.address,
					},
				}

				// transfer ndt token to token farm contract
				const tokenTotalSupply = new BN((await ndtTokenContract.totalSupply()).toString())

				await ndtTokenContract.transfer(
					tokenFarmContract.address,
					tokenTotalSupply.sub(KEPT_BALANCE).toString()
				)
			})

			it("success - owner set price feed contract", async () => {
				await setPriceFeedContract(tokenFarmContract, allowedTokens, owner)

				for (const key of Object.keys(allowedTokens)) {
					const payload = allowedTokens[key as keyof AllowedTokens]
					if (payload)
						expect(await tokenFarmContract.tokenPriceFeedMapping(payload.token)).to.equal(
							payload.pricefeed
						)
				}
			})

			it("reverted - ONLY owner allow to set price feed contract", async () => {
				await expect(
					setPriceFeedContract(tokenFarmContract, allowedTokens, addr1)
				).to.be.revertedWith(revertMessages.notOwner)
			})

			it("success - owner add allowed tokens", async () => {
				await addAllowedTokens(tokenFarmContract, allowedTokens, owner)

				expect(await tokenFarmContract.allowedTokens(0)).to.equal(allowedTokens.ndtToken.token)
				expect(await tokenFarmContract.allowedTokens(1)).to.equal(allowedTokens.wethToken.token)
				expect(await tokenFarmContract.allowedTokens(2)).to.equal(allowedTokens.daiToken.token)
			})

			it("reverted - ONLY owner allow to add allowed tokens", async () => {
				await expect(addAllowedTokens(tokenFarmContract, allowedTokens, addr1)).to.be.revertedWith(
					revertMessages.notOwner
				)
			})

			it("return true - token is allowed", async () => {
				await tokenFarmContract.addAllowedToken(ndtTokenContract.address)
				expect(await tokenFarmContract.isTokenAllowed(ndtTokenContract.address)).to.be.true
			})

			it("return false - token is NOT allowed", async () => {
				expect(await tokenFarmContract.isTokenAllowed(ndtTokenContract.address)).to.be.false
			})

			it("success - user can stake token that is allowed", async () => {
				await addAllowedTokens(tokenFarmContract, allowedTokens, owner)
				await stakeToken()
				await stakeToken(addr1, mockDaiContract)
				await stakeToken(addr1)

				expect(
					await tokenFarmContract.stakingBalance(ndtTokenContract.address, owner.address)
				).to.equal(amount_staked)

				expect(
					await tokenFarmContract.stakingBalance(mockDaiContract.address, addr1.address)
				).to.equal(amount_staked)

				expect(await tokenFarmContract.uniqueTokenStaked(owner.address)).to.equal(1)

				expect(await tokenFarmContract.stakers(0)).to.equal(owner.address)
				expect(await tokenFarmContract.poolTotalStaked(ndtTokenContract.address)).to.equal(
					amount_staked.add(amount_staked)
				)
			})

			it("reverted - user can't stake token that is NOT allowed", async () => {
				await ndtTokenContract.approve(tokenFarmContract.address, amount_staked)
				await expect(tokenFarmContract.stakeTokens(amount_staked, ndtTokenContract.address)).to.be
					.reverted
			})

			it("success - issue token to staked user", async () => {
				await addAllowedTokens(tokenFarmContract, allowedTokens, owner)
				await setPriceFeedContract(tokenFarmContract, allowedTokens, owner)
				await stakeToken()
				const startingBalance = await ndtTokenContract.balanceOf(owner.address)

				await tokenFarmContract.issueTokensReward()

				expect(await ndtTokenContract.balanceOf(owner.address)).to.equal(
					startingBalance.add(INITIAL_PRICE)
				)
			})

			it("success - user unstake token", async () => {
				await addAllowedTokens(tokenFarmContract, allowedTokens, owner)
				await stakeToken()
				await stakeToken(addr1)

				const startingBalance = await ndtTokenContract.balanceOf(owner.address)

				await tokenFarmContract.unStakeToken(ndtTokenContract.address)

				expect(
					await tokenFarmContract.stakingBalance(ndtTokenContract.address, owner.address)
				).to.equal(0)

				expect(await tokenFarmContract.poolTotalStaked(ndtTokenContract.address)).to.equal(
					amount_staked
				)

				expect(await tokenFarmContract.uniqueTokenStaked(owner.address)).to.equal(0)

				expect(await tokenFarmContract.stakers(0)).to.equal(addr1.address)

				expect(await ndtTokenContract.balanceOf(owner.address)).to.equal(
					startingBalance.add(amount_staked)
				)
			})
	  })
