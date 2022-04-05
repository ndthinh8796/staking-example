import { Button } from './Button'
import { utils } from 'ethers'
import {
  useAmountUserStaked,
  usePoolTotalStaked,
  useStakeToken,
  useToast,
  useTokenValue,
} from './hooks'
import { ChangeEvent, useEffect, useState } from 'react'
import { Pool } from '@/pages'
import Image from 'next/image'
import { useEthers, useTokenBalance } from '@usedapp/core'
import clsx from 'clsx'
import { commify } from '@/lib/utils'

export interface IStakingPool {
  pool: Pool
}

export const StakingPool = ({ pool }: IStakingPool) => {
  const { account } = useEthers()
  // amount user want to stake
  const [amount, setAmount] = useState('0')
  const [amountRange, setAmountRange] = useState('0')

  const [canStake, setCanStake] = useState(false)
  const tokenPrice = useTokenValue(pool.token)
  const {
    approve,
    approveErc20State,
    stakeToken,
    stakeState,
    withdrawState,
    withdrawToken,
  } = useStakeToken(pool.token)
  const stakedAmount = useAmountUserStaked(pool.token)
  const totalStaked = usePoolTotalStaked(pool.token)
  const balance = useTokenBalance(pool.token, account)

  const approveStake = () => {
    approve(amount)
  }
  useToast('approve', approveErc20State)
  useToast('stake', stakeState)
  useToast('withdraw', withdrawState)

  useEffect(() => {
    if (approveErc20State.status === 'Success') {
      setCanStake(true)
    }
  }, [approveErc20State])

  useEffect(() => {
    if (stakeState.status === 'Success') {
      setCanStake(false)
    }
  }, [stakeState])

  const validateAndSetAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.validity.valid) {
      setCanStake(false)
      setAmount(e.target.value)
    }
  }

  const handleAmountRange = (value: string) => {
    setAmountRange(value)
    if (balance) {
      setCanStake(false)
      setAmount(
        value === '0'
          ? ''
          : parseFloat(utils.formatEther(balance.div(100).mul(value))).toFixed(
              18
            )
      )
    }
  }

  return (
    <>
      <div
        className={clsx(
          'offset relative col-span-1 mx-auto flex h-96 w-full flex-col justify-between gap-5 overflow-hidden rounded-md  bg-neutral-900 px-6 pt-4 ring-2 hover:shadow-lg hover:shadow-blue-300 sm:h-80',
          stakedAmount?.gt(0) ? 'ring-blue-300' : 'ring-rose-300'
        )}
      >
        <div>
          <div className="flex items-center gap-3 mb-3 text-base font-semibold">
            {' '}
            <div className="relative">
              <Image
                className="bg-white rounded-full"
                src={pool.image}
                alt={pool.name}
                width={32}
                height={32}
              />
              <div className="absolute -bottom-2 -right-2">
                <Image
                  className="bg-white rounded-full"
                  src={pool.reward}
                  alt={pool.rewardName}
                  width={20}
                  height={20}
                />
              </div>
            </div>
            {pool.name}
          </div>
          <div className="text-sm">
            <span className="text-xs text-rose-200">Total Staked:</span>{' '}
            {totalStaked &&
              commify(utils.formatEther(totalStaked)) + ' ' + pool.name}
          </div>

          {stakedAmount?.gt(0) && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-xs text-rose-200">Staking Balance:</span>{' '}
              {commify(utils.formatEther(stakedAmount)) + ' ' + pool.name}
            </div>
          )}
          {balance && (
            <div>
              <input
                className="w-full text-sm text-right bg-black rounded-full"
                value={amount}
                pattern="^[0-9]*[.,]?[0-9]{0,18}$"
                inputMode="decimal"
                min="0"
                placeholder="0.0"
                onChange={validateAndSetAmount}
              />
              <div className="text-xs text-right text-neutral-400">
                {tokenPrice && amount
                  ? '~' +
                    commify(
                      (
                        parseFloat(utils.formatUnits(tokenPrice, 8)) *
                        parseFloat(amount)
                      ).toFixed(2)
                    ) +
                    ' USD'
                  : '~0 USD'}
              </div>
              <div className="w-full">
                <input
                  className="w-full"
                  name="stake"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={amountRange}
                  onChange={(e) => handleAmountRange(e.target.value)}
                />
                <div className="flex justify-between gap-2">
                  {[
                    { title: '25%', value: '25' },
                    { title: '50%', value: '50' },
                    { title: '75%', value: '75' },
                    { title: 'Max', value: '100' },
                  ].map((range) => (
                    <button
                      className="w-1/4 py-1 text-xs bg-purple-400 rounded-full hover:bg-purple-500 active:bg-purple-300"
                      onClick={() => handleAmountRange(range.value)}
                      key={range.title}
                    >
                      {range.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-right text-neutral-400">
                Balance: {commify(utils.formatEther(balance))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-col items-end gap-5 mb-4 sm:flex-row sm:justify-end">
            {stakedAmount?.gt(0) && (
              <Button
                disabled={withdrawState.status === 'Mining'}
                onClick={() => withdrawToken()}
              >
                Withdraw
              </Button>
            )}
            {canStake ? (
              <Button
                disabled={stakeState.status === 'Mining'}
                onClick={() => stakeToken()}
              >
                Stake
              </Button>
            ) : (
              <Button
                disabled={
                  !account ||
                  !amount ||
                  parseFloat(amount) <= 0 ||
                  approveErc20State.status === 'Mining'
                }
                onClick={() => approveStake()}
              >
                Approve
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
