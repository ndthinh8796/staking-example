// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, network } from "hardhat"
import BN from "bn.js"
import { networkConfig, KEPT_BALANCE } from "../utils/helperHardhat.config"
import { AllowedTokens, addAllowedTokens, setPriceFeedContract } from "../utils/helpfulScripts"

import { NDTToken__factory } from "../typechain-types/factories/NDTToken__factory"
import { TokenFarm__factory } from "../typechain-types/factories/TokenFarm__factory"

async function main() {
	if (network.config.chainId === 1666700000) {
		const [owner] = await ethers.getSigners()
		const networkConfigs = networkConfig[network.config.chainId]
		console.log(owner.address)
		const NDTToken = (await ethers.getContractFactory("NDTToken")) as NDTToken__factory
		const ndtToken = await NDTToken.deploy()
		await ndtToken.deployed()

		const TokenFarm = (await ethers.getContractFactory("TokenFarm")) as TokenFarm__factory
		const tokenFarm = await TokenFarm.deploy(ndtToken.address)
		await tokenFarm.deployed()

		console.log("NDTToken deployed to:", ndtToken.address)
		console.log("TokenFarm deployed to:", tokenFarm.address)

		// set allowed tokens
		const allowedTokens: AllowedTokens = {
			ndtToken: {
				pricefeed: networkConfigs.ndtUsdPriceFeed,
				token: ndtToken.address,
			},
			wethToken: {
				pricefeed: networkConfigs.ethUsdPriceFeed,
				token: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
			},
			daiToken: {
				pricefeed: networkConfigs.daiUsdPriceFeed,
				token: "0x04DF6e4121c27713ED22341E7c7Df330F56f289B",
			},
		}

		// transfer ndt token to token farm contract
		const tokenTotalSupply = new BN((await ndtToken.totalSupply()).toString())

		await ndtToken.transfer(tokenFarm.address, tokenTotalSupply.sub(KEPT_BALANCE).toString())
		await addAllowedTokens(tokenFarm, allowedTokens, owner)
		await setPriceFeedContract(tokenFarm, allowedTokens, owner)
	}
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
