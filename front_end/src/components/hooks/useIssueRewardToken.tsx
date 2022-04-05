import { useContractFunction } from '@usedapp/core'
import { useTokenFarmContract } from './useTokenFarmContract'

export const useIssueRewardToken = () => {
  const { tokenFarmContract } = useTokenFarmContract()

  const { send: issueReward, state: issueRewardState } = useContractFunction(
    tokenFarmContract,
    'issueTokensReward',
    {
      transactionName: 'issue reward base on user staked amount',
    }
  )
  return {
    issueReward,
    issueRewardState,
  }
}
