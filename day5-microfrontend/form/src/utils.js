export const getQueryParams = (url, param) => {
  return new URLSearchParams(url).get(param)
}