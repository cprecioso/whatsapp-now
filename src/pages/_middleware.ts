import { NextRequest, NextResponse, NextFetchEvent } from "next/server"

export const middleware = (
  req: NextRequest,
  ev: NextFetchEvent
): Promise<Response | undefined> | Response | undefined => {
  const country = req.geo.country?.slice(0, 2).toLowerCase()

  console.log(req, ev)

  if (country) {
    return NextResponse.rewrite(`/${country}`)
  }
}
