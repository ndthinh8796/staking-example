import { TokenFarm } from "../typechain-types/TokenFarm"

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

export interface AllowedTokens {
	daiToken: {
		token: string
		pricefeed: string
	}
	ndtToken: {
		token: string
		pricefeed: string
	}
	wethToken: {
		token: string
		pricefeed: string
	}
}

export const addAllowedTokens = async (
	mainContract: TokenFarm,
	allowedTokensList: AllowedTokens,
	account: SignerWithAddress
) => {
	const useContractWithAccount = mainContract.connect(account)
	for (const key of Object.keys(allowedTokensList)) {
		const payload = allowedTokensList[key as keyof AllowedTokens]
		await useContractWithAccount.addAllowedToken(payload.token)
	}
}
export const setPriceFeedContract = async (
	mainContract: TokenFarm,
	allowedTokensList: AllowedTokens,
	account: SignerWithAddress
) => {
	const useContractWithAccount = mainContract.connect(account)
	for (const key of Object.keys(allowedTokensList)) {
		const payload = allowedTokensList[key as keyof AllowedTokens]
		await useContractWithAccount.setPriceFeedContract(payload.token, payload.pricefeed)
	}
}
