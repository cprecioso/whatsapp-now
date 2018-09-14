import { observer } from "mobx-react"
import React, { SFC } from "react"

declare namespace PhoneInput {
  interface Props {
    phoneNumber?: string
    flag?: string
    showFlag?: boolean
  }
  interface Events {
    onChange?: (input: string) => void
    onFocus?: () => void
    onBlur?: () => void
  }
}

const PhoneInput: SFC<PhoneInput.Props & PhoneInput.Events> = observer(
  ({ phoneNumber, flag, showFlag, onFocus, onChange, onBlur }) => (
    <label className="inputLine">
      <span className={`flag fades ${showFlag ? "" : "hidden"}`}>{flag}</span>
      <input
        autoFocus
        className="input"
        type="tel"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={onChange ? e => onChange(e.target.value) : undefined}
        onFocus={onFocus ? () => onFocus() : undefined}
        onBlur={onBlur ? () => onBlur() : undefined}
      />
      <style jsx>{`
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
        .input:focus {
          outline: none;
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
      `}</style>
    </label>
  )
)

export default PhoneInput
