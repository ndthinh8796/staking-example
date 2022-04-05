import { useCall } from '@usedapp/core'
import { useTokenFarmContract } from './useTokenFarmContract'

export const useTokenValue = (tokenAddress: string) => {
  const { tokenFarmContract } = useTokenFarmContract()

  const { value, error } =
    useCall({
      contract: tokenFarmContract,
      method: 'getTokenValue',
      args: [tokenAddress],
    }) ?? {}

  if (error) {
    console.log(error.message)
    return undefined
  }
  return value?.[0]
}
