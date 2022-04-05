import { Chain } from '@usedapp/core'

export const HarmonyTestNet: Chain = {
  chainId: 1666700000,
  chainName: 'Harmony',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xd078799c53396616844e2fa97f0dd2b4c145a685',
  getExplorerAddressLink: (address: string) =>
    `https://explorer.pops.one/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://explorer.pops.one/tx/${transactionHash}`,
}

export default { HarmonyTestNet }
