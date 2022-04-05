import {
  useEthers,
  shortenAddress,
  useTokenBalance,
  useEtherBalance,
} from '@usedapp/core'
import { Button } from './Button'
import { HarmonyTestNet } from '@/lib/harmony'
import { utils } from 'ethers'
import map from '@/lib/map.json'

declare let window: any

export const NavBar = () => {
  const { account, activateBrowserWallet, deactivate, chainId } = useEthers()
  const ether = useEtherBalance(account)
  const switchNetwork = async () => {
    // Check if MetaMask is installed
    // MetaMask injects the global API into window.ethereum
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: utils.hexlify(HarmonyTestNet.chainId) }], // chainId must be in hexadecimal numbers
        })
      } catch (error: any) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: utils.hexlify(HarmonyTestNet.chainId),
                  rpcUrl: 'https://api.s0.b.hmny.io',
                },
              ],
            })
          } catch (addError) {
            console.error(addError)
          }
        }
        console.error(error)
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      alert(
        'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
      )
    }
  }

  const isConnected = account !== undefined
  return (
    <>
      <div className="flex h-28 w-full items-center justify-end gap-4 text-sm">
        <div>{chainId && map[chainId]?.name}</div>
        <div className="flex items-center gap-4 rounded-full bg-rose-300 pl-5">
          <span className="text-black">
            {ether ? utils.commify(parseInt(utils.formatEther(ether))) : 0} ONE
          </span>
          {isConnected && chainId !== HarmonyTestNet.chainId ? (
            <Button className="bg-red-700 text-xs" onClick={switchNetwork}>
              Switch network to Harmony
            </Button>
          ) : (
            <Button onClick={isConnected ? deactivate : activateBrowserWallet}>
              {isConnected ? shortenAddress(account || '') : 'Connect'}
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
