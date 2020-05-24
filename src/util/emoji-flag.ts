/*
  These magic numbers are charCode math, where we assume the offset between
  any two uppercase leters (e.g. A - C = 2) is equal between the emoji flag
  variant of those letters (e.g. (emoji A) - (emoji C) = 2).
*/
const FLAG_LETTER_EMOJI_FIRST_CODEPOINT = 55356 // "🇦".charCodeAt(0)
const UPPERCASE_AND_FLAG_LETTER_EMOJI_SECOND_CODEPOINT_OFFSET = 56741 // "🇦".charCodeAt(1) - "A".charCodeAt(0)

export const getFlag = (countryCode: string) => {
  countryCode = countryCode.slice(0, 2).toUpperCase()
  return String.fromCharCode(
    FLAG_LETTER_EMOJI_FIRST_CODEPOINT,
    UPPERCASE_AND_FLAG_LETTER_EMOJI_SECOND_CODEPOINT_OFFSET +
      countryCode.charCodeAt(0),
    FLAG_LETTER_EMOJI_FIRST_CODEPOINT,
    UPPERCASE_AND_FLAG_LETTER_EMOJI_SECOND_CODEPOINT_OFFSET +
      countryCode.charCodeAt(1)
  )
}
