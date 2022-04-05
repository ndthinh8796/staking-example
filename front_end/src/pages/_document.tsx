import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="min-h-screen font-mono antialiased text-white bg-black selection:bg-purple-300 selection:text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
