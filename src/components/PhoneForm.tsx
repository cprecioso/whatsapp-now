import React, { FunctionComponent } from "react"
import { getFlag } from "../util/emoji-flag"
import { makePhoneNumberModel } from "../util/phonenumber"
import { Events as PhoneInputEvents, PhoneInput } from "./PhoneInput"

type Props = { defaultPhone?: string; defaultCountry?: string }

type OnSubmitCb = NonNullable<JSX.IntrinsicElements["form"]["onSubmit"]>
type OnChangeCb = NonNullable<PhoneInputEvents["onChange"]>
type OnBlurCb = NonNullable<PhoneInputEvents["onBlur"]>

export const PhoneForm: FunctionComponent<Props> = ({
  defaultCountry,
  defaultPhone = "",
}) => {
  const defaultFlag = React.useMemo(
    () => defaultCountry && getFlag(defaultCountry),
    [defaultCountry]
  )

  const [phoneNumber, setPhoneNumber] = React.useState(defaultPhone)
  const model = React.useMemo(
    () => makePhoneNumberModel(phoneNumber, defaultCountry),
    [phoneNumber, defaultCountry]
  )

  const [forceShowButton, setForceShowButton] = React.useState(false)
  React.useEffect(() => {
    if (forceShowButton) {
      const timeout = setTimeout(() => setForceShowButton(false), 5000)
      return () => clearTimeout(timeout)
    }
  }, [forceShowButton])

  const showButton = forceShowButton || model.isPossible

  const handleSubmit = React.useCallback<OnSubmitCb>(
    (e) => {
      setForceShowButton(true)
      if (model.isValid && model.whatsappUrl)
        // @ts-expect-error
        window.location = model.whatsappUrl

      e.preventDefault()
    },
    [model]
  )

  const handleBlur = React.useCallback<OnBlurCb>(() => {
    setForceShowButton(false)
    if (model.isValid && model.normalizedNumber)
      setPhoneNumber(model.normalizedNumber)
  }, [model])

  const handleChange = React.useCallback<OnChangeCb>(
    (newNumber) => setPhoneNumber(decodeURIComponent(newNumber)),
    []
  )

  return (
    <form
      onSubmit={handleSubmit}
      className={`root ${model.isValid ? "isValid" : ""}`}
    >
      <PhoneInput
        phoneNumber={phoneNumber}
        flag={model.flag ?? defaultFlag}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input
        className={`submit collapses ${showButton ? "" : "hidden"}`}
        type="submit"
        value={model.isValid ? "Open chat" : "Not valid"}
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
          transition: height 300ms ease-in-out 0ms, margin 300ms ease-in-out 0ms,
            opacity 300ms ease-in-out 300ms, visibility 300ms linear 300ms;
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
