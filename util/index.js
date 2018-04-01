import fetch from "cross-fetch"
import ipUtils from "ip"

export const getIp = req => req.connection.remoteAddress

export const getCountryCode = async ip => {
  if (!ip || ipUtils.isPrivate(ip)) ip = ""
  /*{
    const response = await fetch("http://whatismyip.akamai.com")
    const text = await response.text()
    ip = text.trim()
  }*/

  const response = await fetch(`https://ipinfo.io/${ip && ip + "/"}country`)
  const text = await response.text()
  const country = text.trim().toLowerCase()
  return country
}

export const getFlag = (() => {
  const prefix = 55356 // 1st part of every flag emoji
  const base_emoji = 56806 // 2nd part of "A" flag emoji
  const base_letter = 65 // "A" letter
  return code => {
    code = code.toUpperCase()
    const [fst, snd] = [0, 1].map(
      pst => base_emoji + code.charCodeAt(pst) - base_letter
    )
    return String.fromCharCode(prefix, fst, prefix, snd)
  }
})()
