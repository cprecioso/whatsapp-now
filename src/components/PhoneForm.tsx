import { action, autorun, computed, observable } from "mobx"
import { observer } from "mobx-react"
import React, { Component } from "react"
import PhoneNumberModel from "../model/PhoneNumber"
import { getFlag } from "../util"
import PhoneInput from "./PhoneInput"

@observer
class PhoneForm extends Component {
  model = new PhoneNumberModel()

  @observable
  forceShowButton = false

  prevTimer: ReturnType<typeof setTimeout> | null = null

  componentDidMount() {
    this.model.updateCountry()

    autorun(() => {
      if (this.forceShowButton) {
        if (this.prevTimer) clearTimeout(this.prevTimer)
        this.prevTimer = setTimeout(this.stopForcingShowButton, 5000)
      }
    })
  }

  @action
  stopForcingShowButton = () => {
    this.forceShowButton = false
  }

  @computed
  get showButton() {
    return this.forceShowButton || this.model.isPossible
  }

  @computed
  get currentCountry() {
    return this.model.phoneCountry || this.model.userCountry
  }

  @computed
  get flag() {
    return this.currentCountry ? getFlag(this.currentCountry) : ""
  }

  @computed
  get showFlag() {
    return this.model.number.length > 0
  }

  @action
  handleChange: PhoneInput.Events["onChange"] = v => {
    this.model.number = v
  }

  @action
  handleBlur: PhoneInput.Events["onBlur"] = () => {
    this.forceShowButton = false
    if (this.model.isValid) this.model.number = this.model.normalizedNumber
  }

  @action
  handleSubmit: JSX.IntrinsicElements["form"]["onSubmit"] = evt => {
    this.forceShowButton = true
    if (!this.model.isValid) evt.preventDefault()
  }

  render() {
    return (
      <form
        method="GET"
        action="https://api.whatsapp.com/send"
        onSubmit={this.handleSubmit}
        className={`root ${this.model.isValid ? "isValid" : ""}`}
      >
        <PhoneInput
          phoneNumber={this.model.number}
          flag={this.flag}
          showFlag={this.showFlag}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <input type="hidden" name="phone" value={this.model.whatsAppNumber} />
        <input
          className={`submit collapses ${this.showButton ? "" : "hidden"}`}
          type="submit"
          value={this.model.isValid ? "Open chat" : "Not valid"}
        />

        <style jsx>{`
          .root {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            width: 100%;
            max-width: 80vw;
          }
          .submit {
            font-size: 0.8rem;
            border: 0;
            background: none;
            margin-top: 0.5rem;
            cursor: pointer;
            height: 1rem;
            color: darkgray;
          }
          .isValid .submit {
            color: green;
          }
          .collapses {
            transition: height 300ms ease-in-out 0ms,
              margin 300ms ease-in-out 0ms, opacity 300ms ease-in-out 300ms,
              visibility 300ms linear 300ms;
            opacity: 1;
            visibility: visible;
            position: relative;
            overflow-y: hidden;
          }
          .collapses.hidden {
            transition: opacity 300ms ease-in-out 500ms,
              visibility 300ms linear 500ms, height 300ms ease-in-out 800ms,
              margin 300ms ease-in-out 800ms;
            opacity: 0;
            visibility: hidden;
            height: 0;
            margin: 0;
          }
        `}</style>
      </form>
    )
  }
}

export default PhoneForm
