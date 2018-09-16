import { NextSFC } from "next"
import dynamic from "next/dynamic"
import React from "react"
import Box from "../src/components/Box"

require.resolve("../src/model/PhoneNumber")
require.resolve("mobx")
require.resolve("mobx-react")

// @ts-ignore
const phone = process.browser ? document.location.hash.slice(0) : false

// @ts-ignore
const DynamicRedirector = dynamic(import("../src/components/Redirector"), {
  loading: () => null
})
// @ts-ignore
const DynamicPhoneForm = dynamic(import("../src/components/PhoneForm"), {
  ssr: false,
  loading: () => null
})

declare namespace IndexPage {
  interface Props {}
}

const IndexPage: NextSFC<IndexPage.Props> = () => (
  <>
    <Box>
      {phone ? <DynamicRedirector phone={phone} /> : <DynamicPhoneForm />}
    </Box>
    <footer>
      Made by <a href="https://carlosprecioso.com">Carlos Precioso</a> ·{" "}
      <a href="https://github.com/cprecioso/whatsapp-now">Open source</a>
    </footer>
    <style jsx global>{`
      html {
        font-size: 3em;
        font-family: sans-serif;
      }
      a {
        color: #408a4a;
        text-decoration: none;
      }
    `}</style>
    <style jsx>{`
      footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 0.4rem;
        margin-bottom: 0.2rem;
        color: black;
      }
    `}</style>
  </>
)

export default IndexPage
