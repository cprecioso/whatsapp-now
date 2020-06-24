import { IncomingMessage } from "http"
import ipUtils from "ip"

export const getIp = (req: IncomingMessage) => {
  let ip = req.socket.remoteAddress ?? null
  if (ip === "127.0.0.1") {
    ip = (req.headers["x-real-ip"] as string | undefined) ?? null
  }
  return ip
}

export const getIPCountryCode = async (ip?: string) =>
  (
    await (
      await fetch(
        `https://ipinfo.io/${
          ip && !ipUtils.isPrivate(ip) ? `${ip}/` : ""
        }country`
      )
    ).text()
  )
    .trim()
    .toLowerCase()
