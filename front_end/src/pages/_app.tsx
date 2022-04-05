import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Config, DAppProvider } from '@usedapp/core'
import { HarmonyTestNet } from '@/lib/harmony'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const config: Config = {
  networks: [HarmonyTestNet],
  autoConnect: true,
  readOnlyChainId: HarmonyTestNet.chainId,
  readOnlyUrls: {
    [HarmonyTestNet.chainId]: 'https://api.s0.b.hmny.io/',
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </DAppProvider>
  )
}

export default MyApp
