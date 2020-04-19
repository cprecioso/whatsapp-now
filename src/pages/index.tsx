import { NextPage } from "next"
import React from "react"
import Box from "../components/Box"
import PhoneForm from "../components/PhoneForm"

declare namespace IndexPage {
  interface Props {
    defaultPhone?: string
  }
}

const IndexPage: NextPage<IndexPage.Props> = ({ defaultPhone } = {}) => (
  <>
    <Box>
      <PhoneForm defaultPhone={defaultPhone} />
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

/*
IndexPage.getInitialProps = async ({ query, req, res }) => {
  const phone = query.phone as string | undefined
  if (phone) {
    if (req && res) {
      const { default: PhoneNumberModel } = await import(
        "../src/model/PhoneNumber"
      )
      const model = new PhoneNumberModel(phone)
      model.setCountryCode(req.headers["cf-ipcountry"] as string)

      if (model.isValid) {
        res.statusCode = 301
        res.setHeader("Location", model.whatsAppUrl)
        res.end()
      }
    }

    return { defaultPhone: phone }
  } else {
    return {}
  }
}
*/

export default IndexPage
