import { useCall, useEthers } from '@usedapp/core'
import { useTokenFarmContract } from './useTokenFarmContract'

export const useAmountUserStaked = (tokenAddress: string) => {
  const { tokenFarmContract } = useTokenFarmContract()
  const { account } = useEthers()

  const { value, error } =
    useCall(
      account && {
        contract: tokenFarmContract,
        method: 'stakingBalance',
        args: [tokenAddress, account],
      }
    ) ?? {}

  if (error) {
    console.log(error.message)
    return undefined
  }
  return value?.[0]
}
