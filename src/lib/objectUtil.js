function removeEmptyAttribute(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null && v !== '')
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyAttribute(v) : v])
  )
}
export default {
  removeEmptyAttribute
}
