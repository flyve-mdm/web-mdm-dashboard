// function flatten(obj) {
//   const root = {};
//   (function tree(obj, index) {
//     for (const key in obj) {
//       if (Object.prototype.hasOwnProperty.call(obj, key)) {
//         root[index + key] = obj[key]
//         if (toString.call(obj[key]) === '[object Array]')tree(obj[key], `${index + key}.`)
//         if (toString.call(obj[key]) === '[object Object]')tree(obj[key], `${index + key}.`)
//       }
//     }
//   }(obj, ''))
//   return root
// }


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
      for (const p in cur) {
        isEmpty = false
        recurse(cur[p], prop ? `${prop}.${p}` : p)
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
  for (const p in data) {
    if (Object.prototype.hasOwnProperty.call(data, p)) {
      let cur = resultholder
      let prop = ''
      let m
      while (m = regex.exec(p)) {
        cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}))
        prop = m[2] || m[1]
      }
      cur[prop] = data[p]
    }
  }
  return resultholder[''] || resultholder
}

export {
  flatten,
  unflatten,
}
