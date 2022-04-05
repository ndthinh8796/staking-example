// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, network } from "hardhat"
import BN from "bn.js"
import { networkConfig, KEPT_BALANCE } from "../utils/helperHardhat.config"
import { addAllowedTokens, setPriceFeedContract } from "../utils/helpfulScripts"
import { AllowedTokens } from "../utils/types"

import { NDTToken__factory, TokenFarm__factory } from "../front_end/src/lib/typechain-types"
import { addConfigToFrontEnd } from "../utils/addConfigToFrontEnd"

async function main() {
	if (network.config.chainId === 1666700000) {
		const [owner] = await ethers.getSigners()
		const networkConfigs = networkConfig[network.config.chainId]

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
				pricefeed: networkConfigs.ndt.pricefeed,
				token: ndtToken.address,
			},
			wethToken: {
				pricefeed: networkConfigs.eth.pricefeed,
				token: networkConfigs.eth.token,
			},
			daiToken: {
				pricefeed: networkConfigs.dai.pricefeed,
				token: networkConfigs.dai.token,
			},
			woneToken: {
				pricefeed: networkConfigs.wone.pricefeed,
				token: networkConfigs.wone.token,
			},
		}

		// transfer ndt token to token farm contract
		const tokenTotalSupply = new BN((await ndtToken.totalSupply()).toString())

		await ndtToken.transfer(tokenFarm.address, tokenTotalSupply.sub(KEPT_BALANCE).toString())
		await addAllowedTokens(tokenFarm, allowedTokens, owner)
		await setPriceFeedContract(tokenFarm, allowedTokens, owner)

		addConfigToFrontEnd(ndtToken.address, tokenFarm.address)
	}
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
