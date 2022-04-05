export interface TokenInfo {
	token: string
	pricefeed: string
}

export interface AllowedTokens {
	daiToken: TokenInfo
	ndtToken: TokenInfo
	wethToken: TokenInfo
	woneToken?: TokenInfo
}
