import type { NextPage } from 'next'
import Head from 'next/head'
import { NavBar } from '@/components/NavBar'
import { StakingPool } from '@/components/StakingPool'
import DaiSymbol from '@/assets/dai.svg'
import NDTSymbol from '@/assets/ndt.svg'
import EthSymbol from '@/assets/eth.svg'
import OneSymbol from '@/assets/one.png'
import { useIssueRewardToken } from '@/components/hooks/useIssueRewardToken'
import { Button } from '@/components/Button'
import { useToast } from '@/components/hooks'
import map from '@/lib/map.json'
import { HarmonyTestNet } from '@/lib/harmony'

export interface Pool {
  name: string
  token: string
  image: any
  reward: any
  rewardName: string
  rewardToken: string
}

const pools: Pool[] = [
  {
    name: 'NDT',
    token: map[HarmonyTestNet.chainId].NDTToken,
    image: NDTSymbol,
    reward: NDTSymbol,
    rewardName: 'NDT',
    rewardToken: '0xbEe390619fE9C9144B5F50039C70E2FC6b73E833',
  },
  {
    name: '1Dai',
    token: map[HarmonyTestNet.chainId].DaiToken,
    image: DaiSymbol,
    reward: NDTSymbol,
    rewardName: 'NDT',
    rewardToken: '0xbEe390619fE9C9144B5F50039C70E2FC6b73E833',
  },
  {
    name: '1Eth',
    token: map[HarmonyTestNet.chainId].WethToken,
    image: EthSymbol,
    reward: NDTSymbol,
    rewardName: 'NDT',
    rewardToken: '0xbEe390619fE9C9144B5F50039C70E2FC6b73E833',
  },
  {
    name: 'Wone',
    token: map[HarmonyTestNet.chainId].WoneToken,
    image: OneSymbol,
    reward: NDTSymbol,
    rewardName: 'NDT',
    rewardToken: '0xbEe390619fE9C9144B5F50039C70E2FC6b73E833',
  },
]

const Home: NextPage = () => {
  const { issueReward, issueRewardState } = useIssueRewardToken()
  useToast('issueReward', issueRewardState)
  return (
    <>
      <Head>
        <title>Staking Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-screen-xl px-4 mx-auto mb-44 sm:px-10 xl:px-0">
        <NavBar />
        <div className="flex justify-center my-16">
          <Button onClick={() => issueReward()}>Issue Reward</Button>
        </div>
        <div className="grid max-w-screen-lg grid-cols-1 gap-10 mx-auto mt-10 md:grid-cols-2">
          {pools.map((pool) => (
            <div key={pool.token}>
              <StakingPool pool={pool} />
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Home
