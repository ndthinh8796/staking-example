import BN from "bn.js"
import { ethers } from "hardhat"

export const networkConfig = {
	default: {
		name: "hardhat",
	},
	1666700000: {
		name: "Harmony Testnet",
		eth: {
			token: "0x1E120B3b4aF96e7F394ECAF84375b1C661830013",
			pricefeed: "0x4f11696cE92D78165E1F8A9a4192444087a45b64",
		},
		dai: {
			token: "0xC27255D7805Fc79e4616d5CD50D6f4464AEa75A3",
			pricefeed: "0x1FA508EB3Ac431f3a9e3958f2623358e07D50fe0",
		},
		wone: {
			token: "0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2",
			pricefeed: "0xcEe686F89bc0dABAd95AEAAC980aE1d97A075FAD",
		},
		ndt: {
			pricefeed: "0x1FA508EB3Ac431f3a9e3958f2623358e07D50fe0",
		},
	},
	31337: {
		name: "localhost",
	},
	42: {
		name: "kovan",
		ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
		daiUsdPriceFeed: "0x777A68032a88E5A84678A77Af2CD65A7b3c0775a",
		ndtUsdPriceFeed: "0x777A68032a88E5A84678A77Af2CD65A7b3c0775a",
	},
	4: {
		name: "rinkeby",
	},
	1: {
		name: "mainnet",
	},
	5: {
		name: "goerli",
	},
	137: {
		name: "polygon",
	},
}

export const developmentChains = ["hardhat", "localhost"]

export const DECIMALS = "18"
export const INITIAL_PRICE = "200000000000000000000"
export const KEPT_BALANCE = new BN(ethers.utils.parseEther("1000").toString())
