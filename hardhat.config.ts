import * as dotenv from "dotenv"

import { HardhatUserConfig, task } from "hardhat/config"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "solidity-coverage"

dotenv.config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners()

	for (const account of accounts) {
		console.log(account.address)
	}
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
	solidity: {
		compilers: [{ version: "0.8.13" }, { version: "0.7.0" }],
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	defaultNetwork: "hardhat",
	networks: {
		harmony_testnet: {
			url: `https://api.s0.b.hmny.io`,
			chainId: 1666700000,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
		ropsten: {
			url: process.env.ROPSTEN_URL || "",
			accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
		},
		hardhat: {
			loggingEnabled: false,
		},
		kovan: {
			chainId: 42,
			url: process.env.KOVAN_URL || "",
			accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
		},
	},
	gasReporter: {
		enabled: process.env.REPORT_GAS !== undefined,
		currency: "USD",
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
	mocha: {
		timeout: 3000000,
	},
	typechain: {
		outDir: "./front_end/src/lib/typechain-types",
	},
}

export default config
