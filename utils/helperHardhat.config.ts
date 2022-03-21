import BN from "bn.js"
import { ethers } from "hardhat"

export const networkConfig = {
	default: {
		name: "hardhat",
	},
	1666700000: {
		name: "harmony-testnet",
		ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
		daiUsdPriceFeed: "0x777A68032a88E5A84678A77Af2CD65A7b3c0775a",
		ndtUsdPriceFeed: "0x777A68032a88E5A84678A77Af2CD65A7b3c0775a",
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
