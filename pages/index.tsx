import PhoneNumber from "awesome-phonenumber"
import { action, autorun, computed, flow, observable } from "mobx"
import { observer } from "mobx-react"
import React from "react"
import { getCountryCode, getFlag } from "../src/util"

@observer
class Page extends React.Component {
  @observable
  number = ""

  @observable
  forceShowButton = false

  @observable
  userCountry = ""

  prevTimer: ReturnType<typeof setTimeout> | null = null

  componentDidMount() {
    this.updateCountry()
    autorun(() => {
      if (this.forceShowButton) {
        if (this.prevTimer) clearTimeout(this.prevTimer)
        this.prevTimer = setTimeout(
          action(() => {
            this.forceShowButton = false
          }),
          5000
        )
      }
    })
  }

  updateCountry = flow(function*(this: Page) {
    this.userCountry = yield getCountryCode()
  })

  @computed
  get showButton() {
    return this.forceShowButton || this.isPossible
  }

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
    return (e164 && e164.slice(1)) || ""
  }

  @computed
  get normalizedNumber() {
    return this.pnObject.getNumber("international") || ""
  }

  @computed
  get phoneCountry() {
    return (this.normalizedNumber
      ? new PhoneNumber(this.normalizedNumber, this.userCountry)
      : this.pnObject
    ).getRegionCode()
  }

  @computed
  get currentCountry() {
    return this.phoneCountry || this.userCountry
  }

  @computed
  get flag() {
    return this.currentCountry ? getFlag(this.currentCountry) : ""
  }

  @action
  handleChange: JSX.IntrinsicElements["input"]["onChange"] = evt => {
    this.number = evt.target.value
  }

  @action
  handleBlur: JSX.IntrinsicElements["input"]["onBlur"] = evt => {
    this.forceShowButton = false
    if (this.isValid) this.number = this.normalizedNumber
  }

  @action
  handleSubmit: JSX.IntrinsicElements["form"]["onSubmit"] = evt => {
    this.forceShowButton = true
    if (!this.isValid) evt.preventDefault()
  }

  render() {
    return (
      <form
        method="GET"
        action="https://api.whatsapp.com/send"
        onSubmit={this.handleSubmit}
        className={this.isValid ? "isValid" : ""}
      >
        <div className="box">
          <label className="inputLine">
            <span
              className={`flag fades ${this.number.length > 0 ? "" : "hidden"}`}
            >
              {this.flag}
            </span>
            <input
              autoFocus
              className="input"
              type="tel"
              placeholder="Phone number"
              value={this.number}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </label>
          <input type="hidden" name="phone" value={this.whatsAppNumber} />
          <input
            className={`submit collapses ${this.showButton ? "" : "hidden"}`}
            type="submit"
            value={this.isValid ? "Open chat" : "Not valid"}
          />
        </div>
        <footer>
          <a href="https://github.com/cprecioso/whatsapp-now">Open source</a>
        </footer>
        <style jsx>{`
          :global(html) {
            font-size: 3em;
            font-family: sans-serif;
          }
          form {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            background: #eeeeee;
            font-size: 1rem;
          }
          .box {
            background: #f4f1ee;
            padding: 30px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            width: 80%;
            max-width: 600px;
            border: 1px solid #e1dedb;
            border-radius: 3px;
          }
          input:focus {
            outline: none;
          }
          .inputLine {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: flex-end;
            border-bottom: 1px solid #60ce6e;
          }
          .flag {
            display: block;
            width: 10%;
          }
          .input {
            border: 0;
            background: none;
            font-size: 1rem;
            padding-left: 0.5rem;
            padding-bottom: 0.1rem;
            width: 90%;
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
          .fades {
            transition: opacity 300ms ease-in-out, visibility 300ms linear;
            opacity: 1;
            visibility: visible;
          }
          .fades.hidden {
            opacity: 0;
            visibility: hidden;
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
          footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 0.4rem;
            margin-bottom: 0.2rem;
          }
          footer a {
            color: inherit;
            text-decoration: none;
          }
        `}</style>
      </form>
    )
  }
}

export default Page
