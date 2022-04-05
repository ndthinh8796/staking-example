import { writeFile } from "fs"
import { network } from "hardhat"
import { networkConfig } from "./helperHardhat.config"

export const addConfigToFrontEnd = (ndtTokenAddress: string, TokenFarmAddress: string) => {
	// Add network config to front end

	if (network.config.chainId === 1666700000) {
		const harmonyTestnetNetworkConfig = networkConfig[network.config.chainId]

		const map = {
			[network.config.chainId]: {
				name: harmonyTestnetNetworkConfig.name,
				NDTToken: ndtTokenAddress,
				TokenFarm: TokenFarmAddress,
				DaiToken: harmonyTestnetNetworkConfig.dai.token,
				WethToken: harmonyTestnetNetworkConfig.eth.token,
				WoneToken: harmonyTestnetNetworkConfig.wone.token,
			},
		}

		writeFile("./front_end/src/lib/map.json", JSON.stringify(map), function (err) {
			if (err) {
				return console.error(err)
			}
			console.log("File created!")
		})
	}
}
