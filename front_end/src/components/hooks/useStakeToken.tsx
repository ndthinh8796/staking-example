import { useContractFunction } from '@usedapp/core'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import IERC20 from '@/lib/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json'
import { IERC20 as IERC20Type } from '@/lib/typechain-types/IERC20'
import { useTokenFarmContract } from './useTokenFarmContract'
import { useState } from 'react'

export const useStakeToken = (tokenAddress: string) => {
  const { tokenFarmContract } = useTokenFarmContract()

  const erc20ABI = IERC20.abi
  const erc20Interface = new utils.Interface(erc20ABI)
  const erc20Contract = new Contract(tokenAddress, erc20Interface) as IERC20Type

  const { send: approveErc20Send, state: approveErc20State } =
    useContractFunction(erc20Contract, 'approve', {
      transactionName: 'Approve ERC20 transfer',
    })

  const { send: stake, state: stakeState } = useContractFunction(
    tokenFarmContract,
    'stakeTokens',
    {
      transactionName: 'Stake ERC20 token',
    }
  )
  const [amount, setAmount] = useState('0')

  const approve = (amount: string) => {
    if (tokenFarmContract) {
      setAmount(amount)
      return approveErc20Send(
        tokenFarmContract.address,
        utils.parseEther(amount)
      )
    }
  }

  const stakeToken = () => {
    console.log(amount)
    return stake(utils.parseEther(amount), erc20Contract.address)
  }

  const { send: withdraw, state: withdrawState } = useContractFunction(
    tokenFarmContract,
    'unStakeToken',
    {
      transactionName: 'Unstake ERC20 token',
    }
  )

  const withdrawToken = () => {
    return withdraw(tokenAddress)
  }

  return {
    approve,
    approveErc20State,
    stakeToken,
    stakeState,
    withdrawToken,
    withdrawState,
  }
}
