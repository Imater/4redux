function camelize(string) {
  if (!string) {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default camelize
