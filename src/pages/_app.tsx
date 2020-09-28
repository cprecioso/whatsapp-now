import { AppProps } from "next/app"
import Head from "next/head"
import React, { FunctionComponent } from "react"

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="monetization" content="$precioso.design" />
    </Head>
    <Component {...pageProps} />
  </>
)

export default App
