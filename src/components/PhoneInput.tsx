import React, { FunctionComponent } from "react"

export type Props = {
  phoneNumber?: string
  flag?: string | null
}

export type Events = {
  onChange?: (input: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const PhoneInput: FunctionComponent<Props & Events> = ({
  phoneNumber,
  flag,
  onFocus,
  onChange,
  onBlur,
}) => {
  const handleChange = React.useCallback<
    NonNullable<JSX.IntrinsicElements["input"]["onChange"]>
  >((e) => onChange?.(e.target.value), [onChange])

  return (
    <label className="inputLine">
      <span className="flag">{flag || "🏳️"}</span>
      <input
        autoFocus
        className="input"
        type="tel"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
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
}
