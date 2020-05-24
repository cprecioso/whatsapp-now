import PhoneNumber from "awesome-phonenumber"
import { getFlag } from "./emoji-flag"

export type PhoneNumberModel = {
  number: string
  countryCode?: string
  normalizedNumber?: string
  whatsappUrl?: string
  isValid: boolean
  isPossible: boolean
  flag?: string
}

export const makePhoneNumberModel = (
  number: string,
  defaultCC?: string
): PhoneNumberModel => {
  try {
    const pn = new PhoneNumber(number, defaultCC)
    const countryCode = pn.getRegionCode()
    return {
      number,
      isPossible: pn.isPossible(),
      isValid: pn.isValid(),
      whatsappUrl: `https://api.whatsapp.com/send?phone=${pn
        .getNumber("e164")
        .slice(1)}`,
      normalizedNumber: pn.getNumber("international"),
      countryCode,
      flag: getFlag(countryCode),
    }
  } catch {
    return { number, isValid: false, isPossible: false }
  }
}
