import { action, autorun, observable, runInAction } from "mobx"
import { observer } from "mobx-react"
import dynamic from "next/dynamic"
import React, { Component } from "react"
import PhoneNumberModel from "../model/PhoneNumber"

// @ts-ignore
const DynamicPhoneForm = dynamic(import("./PhoneForm"), { loading: () => null })

declare namespace Redirector {
  type Status = "loading" | "redirecting" | "error" | "try-again"
  interface Props {
    phone: string
  }
}

type Status = Redirector.Status

@observer
class Redirector extends Component<Redirector.Props> {
  model = new PhoneNumberModel(this.props.phone)

  @observable
  status: Status = "loading"

  async componentDidMount() {
    this.model.updateCountry()
    autorun(() => {
      if (this.model.userCountry) {
        if (this.model.isValid) {
          runInAction(() => (this.status = "redirecting"))
          document.location.href = `https://api.whatsapp.com/send?phone=${
            this.model.whatsAppNumber
          }`
        } else {
          runInAction(() => (this.status = "error"))
        }
      }
    })
  }

  @action
  onTryAgain = () => (this.status = "try-again")

  renderStateFragment() {
    switch (this.status) {
      case "loading":
        return <>Loading...</>
      case "redirecting":
        return <>Say something nice!</>
      case "error":
        return (
          <>
            Invalid number.
            <br />
            <a href="#" onClick={this.onTryAgain}>
              Try with another?
            </a>
            <div className="hidden">
              <DynamicPhoneForm />
            </div>
            <style jsx>{`
              .hidden {
                display: none;
              }
            `}</style>
          </>
        )
      case "try-again":
        return <DynamicPhoneForm defaultNumber={this.props.phone} />
    }
  }

  render() {
    return (
      <div>
        {this.renderStateFragment()}
        <style jsx>{`
          div {
            text-align: center;
            color: black;
            font-size: 0.8rem;
          }
        `}</style>
      </div>
    )
  }
}

export default Redirector
