import { GetServerSideProps, NextPage } from "next"
import { getIp, getIPCountryCode } from "../util/country-code"
import { makePhoneNumberModel } from "../util/phonenumber"

type Props = {}
type Params = { phone: string }

export default (() => null) as NextPage<Props>

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
  req,
  res,
}) => {
  try {
    if (params?.phone) {
      let model = makePhoneNumberModel(params.phone)

      if (!model.countryCode) {
        const ip = getIp(req)
        if (!ip) throw new Error("Can't find IP")
        const countryCode = await getIPCountryCode(ip)
        model = makePhoneNumberModel(params.phone, countryCode)
      }

      if (model.whatsappUrl) {
        res.writeHead(301, { Location: model.whatsappUrl }).end()
        return { props: {} }
      }
    }
  } catch {}

  res
    .writeHead(307, {
      Location: `/${
        params?.phone ? `?phone=${encodeURIComponent(params.phone)}` : ""
      }`,
    })
    .end()
  return { props: {} }
}
