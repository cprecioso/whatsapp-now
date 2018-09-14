import { autorun, observable, runInAction } from "mobx"
import { observer } from "mobx-react"
import Link from "next/link"
import React, { Component } from "react"
import PhoneNumberModel from "../model/PhoneNumber"

declare namespace Redirector {
  interface Props {
    phone: string
  }
}

@observer
class Redirector extends Component<Redirector.Props> {
  model = new PhoneNumberModel(this.props.phone)

  @observable
  errorState = false

  async componentDidMount() {
    this.model.updateCountry()
    autorun(() => {
      if (this.model.userCountry) {
        if (this.model.isValid) {
          document.location.href = `https://api.whatsapp.com/send?phone=${
            this.model.whatsAppNumber
          }`
        } else {
          runInAction(() => (this.errorState = true))
        }
      }
    })
  }

  render() {
    return (
      <div>
        {this.errorState ? (
          <>
            Invalid number.
            <br />
            <Link
              href={{ pathname: "/", query: { startWith: this.props.phone } }}
              prefetch
            >
              <a>Try with another?</a>
            </Link>
          </>
        ) : (
          <>Loading...</>
        )}
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
