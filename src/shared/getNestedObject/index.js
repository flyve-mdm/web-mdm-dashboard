export default (nestedObj, pathArr) => (
  pathArr.reduce((obj, key) => ((obj && obj[key] !== 'undefined') ? obj[key] : undefined), nestedObj)
)
