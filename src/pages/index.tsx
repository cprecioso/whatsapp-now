import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import Box from "../components/Box"
import { PhoneForm } from "../components/PhoneForm"
import { getIp, getIPCountryCode } from "../util/country-code"

type Props = { defaultCountry?: string }
type Query = { phone?: string }

export default (({ defaultCountry }) => {
  const query = useRouter().query as Query

  return (
    <>
      <Box>
        <PhoneForm defaultPhone={query.phone} defaultCountry={defaultCountry} />
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
}) as NextPage<Props>

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  req,
}) => {
  try {
    const ip = getIp(req)
    if (!ip) return { props: {} }
    const cc = await getIPCountryCode(ip)
    return { props: { defaultCountry: cc } }
  } catch {
    return { props: {} }
  }
}
