export function commify(value: string) {
  var comps = String(value).split('.')
  if (
    comps.length > 2 ||
    !comps[0].match(/^-?[0-9]*$/) ||
    (comps[1] && !comps[1].match(/^[0-9]*$/)) ||
    value === '.' ||
    value === '-.'
  ) {
    console.error('invalid value')
  }
  // Make sure we have at least one whole digit (0 if none)
  var whole = comps[0]
  var negative = ''
  if (whole.substring(0, 1) === '-') {
    negative = '-'
    whole = whole.substring(1)
  }
  // Make sure we have at least 1 whole digit with no leading zeros
  while (whole.substring(0, 1) === '0') {
    whole = whole.substring(1)
  }
  if (whole === '') {
    whole = '0'
  }
  var suffix = ''
  if (comps.length === 2) {
    suffix = '.' + (comps[1] || '00')
  }
  var formatted = []
  while (whole.length) {
    if (whole.length <= 3) {
      formatted.unshift(whole)
      break
    } else {
      var index = whole.length - 3
      formatted.unshift(whole.substring(index))
      whole = whole.substring(0, index)
    }
  }
  return negative + formatted.join(',') + suffix
}
