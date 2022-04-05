import { ReactText, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { TransactionStatus } from '@usedapp/core'

const toastMessages = {
  approve: {
    Mining: 'Approving...',
    Success: 'Contract is approved, you can stake now',
  },
  stake: {
    Mining: 'Staking...',
    Success: 'Stake success!',
  },
  issueReward: {
    Mining: 'Issueing reward...',
    Success: 'Reward sent to stakers',
  },
  withdraw: {
    Mining: 'Withdrawing...',
    Success: 'Token withdraw success',
  },
}

export type Type = 'approve' | 'stake' | 'issueReward' | 'withdraw'
export type State = TransactionStatus

export const useToast = (type: Type, state: State) => {
  const toastId = useRef<ReactText>()

  useEffect(() => {
    if (state.status === 'Mining') {
      toastId.current = toast(toastMessages[type][state.status], {
        autoClose: false,
      })
    }
    if (state.status === 'Success') {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: toastMessages[type][state.status],
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
        })
      }
    }
  }, [state])
}
