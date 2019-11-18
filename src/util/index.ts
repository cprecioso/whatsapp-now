import { IncomingMessage } from "http"
import ipUtils from "ip"
import "isomorphic-fetch"

export const getIp = (req: IncomingMessage) =>
  req && req.connection && req.connection.remoteAddress

export const getCountryCode = async (ip?: string) => {
  if (!ip || ipUtils.isPrivate(ip)) ip = ""
  const response = await fetch(`https://ipinfo.io/${ip && ip + "/"}country`)
  const text = await response.text()
  const country = text.trim().toLowerCase()
  return country
}

export const getFlag = (countryCode: string) => {
  countryCode = countryCode.slice(0, 2).toUpperCase()

  /*
    These magic numbers are charCode math, where we assume the offset between
    any two uppercase leters (e.g. A - C = 2) is equal between the emoji flag
    variant of those letters (e.g. (emoji A) - (emoji C) = 2).
  */

  return String.fromCharCode(
    55356 /* First codepoint of all flag letter emoji */,
    56741 /* Offset between the uppercase A and the emoji A */ +
      countryCode.charCodeAt(0),
    55356,
    56741 + countryCode.charCodeAt(1)
  )
}
