import { IncomingMessage } from "http"
import ipUtils from "ip"

export const getIp = (req: IncomingMessage) => req.socket.remoteAddress ?? null

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
