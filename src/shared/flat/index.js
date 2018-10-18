function flatten(data) {
  const result = {}
  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur
    } else if (Array.isArray(cur)) {
      const l = cur.length
      for (let i = 0; i < l; i += 1) { recurse(cur[i], `${prop}[${i}]`) }
      if (l === 0) { result[prop] = [] }
    } else {
      let isEmpty = true
      for (const key in cur) {
        if (Object.prototype.hasOwnProperty.call(cur, key)) {
          isEmpty = false
          recurse(cur[key], prop ? `${prop}.${key}` : key)
        }
      }
      if (isEmpty) { result[prop] = {} }
    }
  }
  recurse(data, '')
  return result
}

function unflatten(data) {
  if (Object(data) !== data || Array.isArray(data)) { return data }
  const regex = /\.?([^.[\]]+)|\[(\d+)\]/g


  const resultholder = {}
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let cur = resultholder
      let prop = ''
      let m
      while (m = regex.exec(key)) {
        cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}))
        prop = m[2] || m[1]
      }
      cur[prop] = data[key]
    }
  }
  return resultholder[''] || resultholder
}

export {
  flatten,
  unflatten,
}
