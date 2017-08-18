export function sanitizeKey(key) {
  return key.replace(/\./g, '@')
}

export function unsanitizeKey(key) {
  return key.replace(/@/g, '.')
}

export function parseValidations(validation) {
  return Object.keys(validation).reduce((_validation, v) => {
    return Object.assign({}, _validation, {
      [unsanitizeKey(v)]: validation[v]
    })
  }, {})
}
