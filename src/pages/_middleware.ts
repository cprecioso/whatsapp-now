import { NextRequest, NextResponse } from "next/server"

export const middleware = (
  req: NextRequest
): Promise<Response | undefined> | Response | undefined => {
  const country = req.geo.country

  console.log(req.geo)

  if (country) {
    return NextResponse.rewrite(`/${country?.slice(0, 2).toLowerCase()}`)
  }
}
