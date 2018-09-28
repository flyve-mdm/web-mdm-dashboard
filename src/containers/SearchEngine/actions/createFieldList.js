export default (listSearchOptions) => {
  const list = []

  for (const key in listSearchOptions) {
    if (listSearchOptions.hasOwnProperty.call(listSearchOptions, key)) {
      if (listSearchOptions[key].name) {
        list.push({
          value: key,
          name: listSearchOptions[key].name,
        })
      }
    }
  }

  return list.sort((a, b) => {
    if (a.name > b.name) {
      return 1
    }
    if (a.name < b.name) {
      return -1
    }
    return 0
  })
}
