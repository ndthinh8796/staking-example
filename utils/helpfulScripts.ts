import { TokenFarm } from "../front_end/src/lib/typechain-types"

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { AllowedTokens } from "./types"

export const addAllowedTokens = async (
	mainContract: TokenFarm,
	allowedTokensList: AllowedTokens,
	account: SignerWithAddress
) => {
	const useContractWithAccount = mainContract.connect(account)
	for (const key of Object.keys(allowedTokensList)) {
		const payload = allowedTokensList[key as keyof AllowedTokens]
		if (payload) await useContractWithAccount.addAllowedToken(payload.token)
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
		if (payload) await useContractWithAccount.setPriceFeedContract(payload.token, payload.pricefeed)
	}
}
