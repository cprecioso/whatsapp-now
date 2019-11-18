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

export const getFlag = (() => {
  const prefix = 55356 // 1st part of every flag emoji
  const base_emoji = 56806 // 2nd part of "A" flag emoji
  const base_letter = 65 // "A" letter

  return (code: string) => {
    code = code.toUpperCase()
    const [fst, snd] = [0, 1].map(
      pst => base_emoji + code.charCodeAt(pst) - base_letter
    )
    return String.fromCharCode(prefix, fst, prefix, snd)
  }
})()
