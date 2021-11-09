import type { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import Box from "../components/Box"
import { PhoneForm } from "../components/PhoneForm"

export type Props = { defaultCountry?: string; defaultPhone?: string }
type Query = { country?: string; phone?: string }

const CountryPage: NextPage<Props> = ({ defaultCountry, defaultPhone }) => {
  const { country = defaultCountry, phone = defaultPhone } = useRouter()
    .query as Query

  return (
    <>
      <Box>
        <PhoneForm defaultPhone={phone} defaultCountry={country} />
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
}

export default CountryPage
