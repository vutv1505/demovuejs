export const loadSuggestList = (query, listSuggest) => {
  if (query.trim().length === 0) {
    return listSuggest
  }
  return listSuggest.filter(itemQuery => {
    return itemQuery.toLowerCase().includes(query.toLowerCase())
  })
}
