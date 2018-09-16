import { NextSFC } from "next"
import React from "react"
import Box from "../src/components/Box"
import PhoneForm from "../src/components/PhoneForm"
import Redirector from "../src/components/Redirector"

declare namespace IndexPage {
  interface Props {
    phone?: string
  }
}

const IndexPage: NextSFC<IndexPage.Props> = ({ phone }) => (
  <>
    <Box>
      {phone ? <Redirector phone={phone} /> : <PhoneForm />}
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

IndexPage.getInitialProps = async ({ query }) => ({
  phone: query.phone && "" + query.phone
})

export default IndexPage
