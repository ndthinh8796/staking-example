import { useEthers } from '@usedapp/core'
import map from '@/lib/map.json'
import { constants, utils, Contract } from 'ethers'
import TokenFarm from '@/lib/artifacts/contracts/TokenFarm.sol/TokenFarm.json'
import { TokenFarm as TokenFarmType } from '@/lib/typechain-types'

export const useTokenFarmContract = () => {
  const { chainId } = useEthers()
  const { abi } = TokenFarm

  const contracts = chainId ? map[chainId] : 'dev'
  const tokenFarmAddress = contracts?.TokenFarm ?? constants.AddressZero

  const tokenFarmInterface = new utils.Interface(abi)

  const tokenFarmContract = new Contract(
    tokenFarmAddress,
    tokenFarmInterface
  ) as TokenFarmType
  return { tokenFarmContract }
}
