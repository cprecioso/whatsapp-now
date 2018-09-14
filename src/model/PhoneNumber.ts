import PhoneNumber from "awesome-phonenumber"
import { computed, flow, observable } from "mobx"
import { getCountryCode } from "../util"

export default class PhoneNumberModel {
  @observable
  number = ""

  @observable
  userCountry = ""

  constructor(phone = "") {
    this.number = phone
  }

  updateCountry = flow(function*(this: PhoneNumberModel) {
    this.userCountry = yield getCountryCode()
  })

  @computed
  get pnObject() {
    return new PhoneNumber(this.number, this.userCountry)
  }

  @computed
  get isValid() {
    return this.pnObject.isValid()
  }

  @computed
  get isPossible() {
    return this.pnObject.isPossible()
  }

  @computed
  get whatsAppNumber() {
    const e164 = this.pnObject.getNumber("e164")
    return e164 && e164.slice(1)
  }

  @computed
  get normalizedNumber() {
    return this.pnObject.getNumber("international")
  }

  @computed
  get phoneCountry() {
    return (this.normalizedNumber
      ? new PhoneNumber(this.normalizedNumber, this.userCountry)
      : this.pnObject
    ).getRegionCode()
  }
}
